import { useEffect, useState } from "react";
import { socket } from "../sockets";
type VideoStatsProps = {
  isSynchronized: boolean;
};
const VideoStats = (props: VideoStatsProps) => {
  const [usersOnline, setUsersOnline] = useState(0);

  useEffect(() => {
    const onConnect = (count: number) => {
      console.log(count);
      setUsersOnline(count);
    };

    socket.on("users-online", onConnect);
    socket.emit("users-online", true);

    return () => {
      socket.off("users-online", onConnect);
    };
  }, []);

  return (
    <section className="inline-flex justify-between rounded-xl bg-zinc-900 p-4 text-zinc-500">
      <p>🟢 {usersOnline} cat lovers watching</p>
      <p>
        {props.isSynchronized ? "👍 You're in sync" : "👎 You're out of sync"}
      </p>
    </section>
  );
};

export default VideoStats;
