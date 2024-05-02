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
    fetch("http://localhost:5000/process", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ youtubeUrl }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.timeStamps);
        setTimeStamps(data.timeStamps);
        setLoading(false);
      });
  }, [videoId]);

  return (
    <div className="w-full min-h-screen flex justify-center bg-gray-200">
      <div className="w-full max-w-[480rem]">
        <div className="flex justify-center h-36 py-12 gap-8 outline-none">
          <input
            className="w-[32rem] h-12 outline-none px-4 rounded-md"
            placeholder="Enter YouTube live URL here..."
            value={youtubeUrl}
            onChange={(e) => setYoutubeUrl(e.target.value)}
          />
          <button
            className="bg-blue-400 px-6 rounded-md"
            onClick={() => setVideoId(youtubeUrl.split("v=")[1])}
          >
            Process
          </button>
        </div>
        <div className="flex max-w-[128rem] bg-neutral-300 mx-auto gap-1 h-[calc(100vh-9rem)]">
          <div className="w-64 overflow-y-auto">
            <div className="w-full text-center font-bold p-4">
              Highlight Timestamps
            </div>
            {loading ? (
              <div className="flex flex-col w-full justify-center items-center gap-4">
                <Circles
                  color="#4d7e8f"
                  visible={true}
                  height={60}
                  width={60}
                />
                <div className="text-xs font-semibold">
                  Loading highlights...
                </div>
              </div>
            ) : (
              timeStamps.map((t) => (
                <button
                  key={t}
                  className="w-full p-4 text-center"
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
