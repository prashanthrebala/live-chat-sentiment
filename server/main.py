import nltk
from fastapi import FastAPI
from scraper import scrape_youtube_url
from stream_analyzer import generate_highlights

# Download VADER lexicon
nltk.download("vader_lexicon")

app = FastAPI()


@app.get("/process/")
async def process(stream_url: str):
    """
    All the live chat messages from the stream_url are scraped and
    then each chat message is processed and analyze to generate the
    highlights of the stream
    """
    # scraping the YouTube stream
    scrape_youtube_url(stream_url)
    top_n_timestamps = generate_highlights(10)

    return {"timestamps": top_n_timestamps}
