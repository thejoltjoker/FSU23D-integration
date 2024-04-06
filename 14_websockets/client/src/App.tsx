import { useEffect, useState } from "react";
import CreateMessage from "./components/CreateMessage";
import SetUser from "./components/SetUser";
import VideoPlayer from "./components/VideoPlayer";

import ChatList from "./components/ChatList";
import VideoStats from "./components/VideoStats";
import { UserContext } from "./contexts/UserContext";
import { ChatMessageType } from "./models/ChatMessageType";
import { socket } from "./sockets";

function App() {
  const [isConnected, setIsConnected] = useState<boolean>(socket.connected);
  const [isSynchronized, setIsSynchronized] = useState(false);
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [username, setUsername] = useState<string>();

  useEffect(() => {
    const onConnect = () => {
      setIsConnected(true);
    };

    const onDisconnect = () => {
      setIsConnected(false);
    };

    const onChatMessage = (msg: ChatMessageType) => {
      console.log(msg);
      setMessages((previous) => [...previous, msg]);
    };

    const onChatUserJoined = (username: string) => {
      setMessages((previous) => [
        ...previous,
        {
          username: "ServerCat",
          content: `${username} joined the chat! 😺`,
          date: new Date(),
        },
      ]);
    };

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("chat-message", onChatMessage);
    socket.on("chat-user-joined", onChatUserJoined);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("chat-message", onChatMessage);
      socket.off("chat-user-joined", onChatUserJoined);
    };
  }, []);

  return (
    <UserContext.Provider value={{ username, setUsername }}>
      <main className="flex h-screen flex-col p-2 pt-4 lg:p-4">
        <h1 className="w-full pb-4 text-center text-2xl font-bold text-white lg:text-left lg:text-5xl">
          😻 Catlovers United 😻
        </h1>
        {/* <p>isConnected: {JSON.stringify(isConnected)}</p> */}
        <div className="flex h-full flex-col gap-2 lg:flex-row lg:gap-4">
          <section className="flex w-full flex-col gap-2 lg:gap-4">
            <VideoPlayer
              updateProgress={(value: boolean) => {
                setIsSynchronized(value);
              }}
            />
            <VideoStats isSynchronized={isSynchronized} />
          </section>
          <section className="flex h-full w-full flex-col justify-between rounded-xl bg-zinc-900 p-2 lg:max-w-md lg:p-4">
            <ChatList messages={messages} />
            {username ? <CreateMessage /> : <SetUser />}
          </section>
        </div>
      </main>
    </UserContext.Provider>
  );
}

export default App;
