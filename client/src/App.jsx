import { useEffect, useState, useRef } from "react";
import YoutubePlayerNew from "./YoutubePlayer";
import { formatTime } from "./utils/utils";
import { Circles } from "react-loader-spinner";

function App() {
  const [timeStamps, setTimeStamps] = useState([]);
  const [startTime, setStartTime] = useState(0);
  const [autoPlay, setAutoPlay] = useState(false);
  const [videoId, setVideoId] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!videoId) return;
    setLoading(true);
    fetch("http://localhost:8000/process", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ "youtube_url": youtubeUrl }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.timeStamps);
        setTimeStamps(data.timeStamps);
        setLoading(false);
      });
  }, [videoId]);

  return (
    <div className="w-full min-h-screen flex justify-center bg-indigo-950">
      <div className="w-full max-w-[480rem]">
        <div className="flex justify-center h-36 py-12 gap-8 outline-none">
          <input
            className="w-[32rem] h-12 outline-none px-4 rounded-md"
            placeholder="Enter YouTube live URL here..."
            value={youtubeUrl}
            onChange={(e) => setYoutubeUrl(e.target.value)}
          />
          <button
            className="bg-indigo-300 px-6 rounded-md"
            onClick={() => setVideoId(youtubeUrl.split("v=")[1])}
          >
            Process
          </button>
        </div>
        <div className="flex max-w-[128rem] bg-indigo-100 mx-auto gap-1 h-[calc(100vh-9rem)]">
          <div className="w-64 overflow-y-auto">
            <div className="w-full text-indigo-950 text-center font-bold p-4">
              Highlight Timestamps
            </div>
            {loading ? (
              <div className="flex flex-col w-full justify-center mt-4 items-center gap-8">
                <Circles
                  color="#3730a3"
                  visible={true}
                  height={45}
                  width={45}
                />
                <div className="text-xs text-indigo-600 font-semibold">
                  Loading highlights...
                </div>
              </div>
            ) : (
              timeStamps.map((t) => (
                <button
                  key={t}
                  className="w-full p-4 text-center text-indigo-600 hover:bg-indigo-200 cursor-pointer"
                  onClick={() => {
                    setStartTime(t);
                    setAutoPlay(true);
                  }}
                >
                  {formatTime(t)}
                </button>
              ))
            )}
          </div>
          <div className="flex-grow p-2">
            <div className="w-full text-center font-bold p-4"></div>
            <YoutubePlayerNew
              videoId={videoId}
              shouldAutoPlay={autoPlay}
              startTime={startTime}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
