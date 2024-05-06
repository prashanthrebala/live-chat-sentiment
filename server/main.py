import nltk
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from scraper import scrape_youtube_url
from stream_analyzer import generate_highlights

# Download VADER lexicon
nltk.download("vader_lexicon")

app = FastAPI()

origins = [
    "http://localhost:5173",
    "http://localhost:8000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class StreamURL(BaseModel):
    youtube_url: str


@app.post("/process/")
async def process(stream_url: StreamURL):
    """
    All the live chat messages from the stream_url are scraped and
    then each chat message is processed and analyze to generate the
    highlights of the stream
    """
    # scraping the YouTube stream
    scrape_youtube_url(stream_url.youtube_url)
    top_n_timestamps = generate_highlights(10)

    return {"timeStamps": top_n_timestamps}
