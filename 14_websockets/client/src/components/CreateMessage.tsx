import { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { useUserContext } from "../contexts/UserContext";
import { socket } from "../sockets";
import { Button } from "./general/Button";
import { Input } from "./general/Field";

const CreateMessage = () => {
  const [message, setMessage] = useState("");
  const { username } = useUserContext();
  const onMessageSend = () => {
    socket.emit("chat-message", {
      username: username,
      content: message,
      date: new Date(),
    });
    setMessage("");
  };
  return (
    <section className="border-t border-zinc-800 pt-2 lg:pt-4">
      <form
        className="flex gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          onMessageSend();
        }}
      >
        <Input
          autoFocus={true}
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          className="h-10 w-full rounded-xl bg-zinc-950 text-sm text-white lg:h-12 lg:text-base"
          placeholder="Write a message..."
        ></Input>

        <Button
          type="submit"
          isDisabled={message === ""}
          className="flex size-10 items-center justify-center rounded-xl border-0 bg-rose-500 p-0 shadow-none hover:bg-rose-700 lg:size-12"
        >
          <FaPaperPlane></FaPaperPlane>
        </Button>
      </form>
    </section>
  );
};

export default CreateMessage;
