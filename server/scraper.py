import sys
import time
from livechat_scraper.scrapers import livechat_scraper
from livechat_scraper.constants import scraper_constants as sCons


def scrape_youtube_url(video_url):
    """ "livechat scraper example, scrapes a video URL and outputs the content
    to a JSON, txt, and raw file.
    """
    scraper = livechat_scraper.LiveChatScraper(video_url)
    scraper.scrape()
    # saves all messages in a txt file, each line is a message entry
    scraper.write_to_file(sCons.OUTPUT_TEXT, "stream_chat")
