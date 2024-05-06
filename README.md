Running the Web client:
Inside the `client/` folder, run:

`npm install` <br />
`npm run dev`

This should start a web client on port 5173


Requires the following python3 packages:
  - NOTE: These packages will be installed via pip when installing the scraper.
  - BeautifulSoup
  - Requests
  - nltk

Install using `pip install -r requirements.txt`

Specify the Youtube Live Video URL in scraper_main.py
Run the file and you'll obtain the timestamp and text values within the output directory

Specify the output file name in sentiment_main.py
Run the file to obtain sentiment scores of each line in sentiment.txt in the root of the folder
  
