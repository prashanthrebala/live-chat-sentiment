from fastapi import FastAPI

from scraper import scrape_youtube_url

# Download VADER lexicon
nltk.download('vader_lexicon')

app = FastAPI()


@app.get("/generate/")
async def generate(stream_url: str):
    """
    All the live chat messages from the stream_url are scraped and
    then each chat message is processed and analyze to generate the
    highlights of the stream
    """
    # scraping the YouTube stream
    scrape_youtube_url(stream_url)
    
    return {"message": f"Processing URL: {stream_url}"}
