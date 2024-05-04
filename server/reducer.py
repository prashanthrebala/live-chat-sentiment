from collections import defaultdict

# Open the file for reading
with open("sentiment.txt", "r") as file:
    # Create an empty dictionary to store the timestamp and sum of sentiment scores
    sentiment_dict = defaultdict(float)

    # Iterate over each line in the file
    for line in file:
        timestamp, score = line.strip().split("\t")
        timestamp = timestamp[:-3]
        sentiment_dict[timestamp] += abs(float(score))

# print top 20 sentiment scores
top_20 = sorted(sentiment_dict.items(), key=lambda x: x[1], reverse=True)[:20]

for t, s in top_20:
    print(f"{t}\t{s}")