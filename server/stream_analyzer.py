import os
from typing import List

import nltk
import pandas as pd
from nltk.sentiment.vader import SentimentIntensityAnalyzer
from pyspark.sql import SparkSession, DataFrame
from pyspark.sql import functions as F


def timestamp_to_seconds(timestamp: str):
    """
    Define a UDF (User Defined Function) to convert timestamps to seconds
    """
    parts = timestamp.split(":")
    if len(parts) == 3:
        # Convert hh:mm:ss format to seconds
        return int(parts[0]) * 3600 + int(parts[1]) * 60 + int(parts[2])
    elif len(parts) == 2:
        # Convert mm:ss format to seconds
        return int(parts[0]) * 60 + int(parts[1])
    else:
        return None  # Handle invalid timestamps if needed


def read_stream_chat(spark: SparkSession, stream_chat_file: str):
    """
    Read the stream chat and generate a spark dataframe
    """
    # Read the text file into a DataFrame
    df = spark.read.text(stream_chat_file)

    # Split each line by tabs into separate columns
    df = df.withColumn("split_data", F.split(df["value"], "\t"))

    # Rename the columns
    df = df.select(
        df["split_data"][0].alias("timestamp"), df["split_data"][1].alias("message")
    )

    # remove all the negative timestamps
    df = df.filter(~df.timestamp.like("%-%"))

    # Apply the UDF to convert timestamps to seconds
    spark.udf.register("timestamp_to_seconds_udf", timestamp_to_seconds)
    df = df.withColumn("seconds", F.expr("timestamp_to_seconds_udf(timestamp)"))

    return df


def get_sentiment_score(message: str):
    """
    For a given text message return the Sentiment score using the
    NLTK VADER sentiment analyzer
    """
    sid = SentimentIntensityAnalyzer()
    score = sid.polarity_scores(message)
    # Compound score represents overall sentiment
    return score["compound"]

def generate_highlights():
    """
    Analyzes the scraped live stream chat to generate highlights
    """
    # Initialize Spark session
    spark = SparkSession.builder.appName("StreamAnalyzer").getOrCreate()

    df = read_stream_chat(spark, "output/stream_chat.txt")

    # Apply the UDF to get sentiment scores for the messages
    spark.udf.register("sentiment_score_udf", get_sentiment_score)
    df = df.withColumn("sentiment_score", F.expr("sentiment_score_udf(message)"))

    print(df.show(5))
