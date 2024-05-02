from flask import Flask, request
from flask_cors import CORS
import time

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})  # Allow requests from all origins


@app.route('/', methods=['GET'])
def handle_get_request():
    return "Hello world"

@app.route('/process', methods=['POST'])
def handle_post_request():
    data = request.get_json()
    print(data["youtubeUrl"])
    time.sleep(240)
    return {"timeStamps": [123, 345, 567, 678, 1231, 4121, 7328, 12399]}

if __name__ == '__main__':
    app.run(port=5000)
