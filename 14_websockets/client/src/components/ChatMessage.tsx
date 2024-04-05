import { format } from "date-fns";
import { ChatMessageType } from "../models/ChatMessageType";

type ChatMessageProps = { message: ChatMessageType };

const ChatMessage = ({ message }: ChatMessageProps) => {
  return (
    <>
      {message.username === "ServerCat" ? (
        <li className="w-full px-4 py-1 text-sm text-zinc-200">
          <div className="inline-flex w-full justify-between gap-2 text-sm text-zinc-600">
            <p>{message.content}</p>
            <p className="text-zinc-600">{format(message.date, "HH:mm")}</p>
          </div>
        </li>
      ) : (
        <li className="w-full rounded-xl bg-zinc-800 px-4 pb-3 pt-2 text-white">
          <div className="mb-1 inline-flex w-full justify-between gap-2 text-sm">
            <p className="font-bold text-rose-500">{message.username}</p>
            <p className="text-zinc-600">{format(message.date, "HH:mm")}</p>
          </div>
          <p>{message.content}</p>
        </li>
      )}
    </>
  );
};

export default ChatMessage;
