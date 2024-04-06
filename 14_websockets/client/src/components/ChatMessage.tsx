import { format } from "date-fns";
import { ChatMessageType } from "../models/ChatMessageType";

type ChatMessageProps = { message: ChatMessageType };

const ChatMessage = ({ message }: ChatMessageProps) => {
  return (
    <>
      {message.username === "ServerCat" ? (
        <li className="w-full px-2 py-1 text-xs text-zinc-200 lg:px-4 lg:text-sm">
          <div className="inline-flex w-full justify-between gap-2 text-zinc-600">
            <p>{message.content}</p>
            <p className="text-zinc-600">{format(message.date, "HH:mm")}</p>
          </div>
        </li>
      ) : (
        <li className="w-full rounded-xl bg-zinc-800 px-2 pb-3 pt-2 text-white lg:px-4">
          <div className="mb-1 inline-flex w-full justify-between gap-2 text-xs lg:text-sm">
            <p className="font-bold text-rose-500">{message.username}</p>
            <p className="text-zinc-600">{format(message.date, "HH:mm")}</p>
          </div>
          <p className="text-sm lg:text-base">{message.content}</p>
        </li>
      )}
    </>
  );
};

export default ChatMessage;
