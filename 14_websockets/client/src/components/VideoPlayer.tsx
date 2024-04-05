import { useEffect, useRef } from "react";
import ReactPlayer from "react-player";
import { OnProgressProps } from "react-player/base";
import { socket } from "../sockets";

type VideoPlayerProps = {
  updateProgress: (value: boolean) => void;
};
const VideoPlayer = (props: VideoPlayerProps) => {
  const playerRef = useRef<ReactPlayer>(null);

  const handleOnProgress = (progressData: OnProgressProps) => {
    const seconds = Math.floor(progressData.playedSeconds);
    socket.emit("video-progress", seconds);
  };

  const handleSeek = (seconds: number, maxDelay: number = 0.2) => {
    if (
      playerRef.current &&
      seconds - playerRef.current.getCurrentTime() > maxDelay
    ) {
      props.updateProgress(false);
      playerRef.current.seekTo(seconds + maxDelay, "seconds");
    } else {
      props.updateProgress(true);
    }
  };

  useEffect(() => {
    socket.on("video-progress", (seconds: number) => {
      if (seconds) {
        handleSeek(seconds);
      }
    });

    return () => {
      socket.off("connect", () => {});
    };
  }, []);

  return (
    <div className="max-w-screen overflow-hidden rounded-xl">
      <div className="aspect-video w-full">
        <ReactPlayer
          width="100%"
          height="100%"
          ref={playerRef}
          url="https://www.youtube.com/watch?v=87p53rAD7Sk"
          playing={true}
          muted={false}
          loop={true}
          config={{
            youtube: {
              playerVars: { disablekb: 1, controls: 0 },
            },
          }}
          progressInterval={1000}
          onProgress={handleOnProgress}
        />
      </div>
    </div>
  );
};

export default VideoPlayer;
