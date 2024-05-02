import React from "react";
import YouTube from "react-youtube";

const YoutubePlayerNew = ({
  videoId,
  shouldAutoPlay = false,
  startTime = 0,
}) => {
  return (
    <div className="w-full flex justify-center">
      <YouTube
        videoId={videoId}
        opts={{
          height: "540",
          width: "960",
          playerVars: {
            autoplay: shouldAutoPlay ? 1 : 0,
            start: startTime,
          },
        }}
      />
    </div>
  );
};

export default YoutubePlayerNew;
