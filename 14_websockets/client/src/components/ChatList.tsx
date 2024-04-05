import { useEffect, useRef } from "react";
import { ChatMessageType } from "../models/ChatMessageType";
import ChatMessage from "./ChatMessage";

type Props = { messages: ChatMessageType[] };

const ChatList = ({ messages }: Props) => {
  const messagesEndRef = useRef<HTMLLIElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  return (
    <ul className="mb-4 flex h-full flex-col gap-4 overflow-y-auto">
      {messages.map((message) => (
        <ChatMessage message={message} />
      ))}
      <li ref={messagesEndRef}></li>
    </ul>
  );
};

export default ChatList;
