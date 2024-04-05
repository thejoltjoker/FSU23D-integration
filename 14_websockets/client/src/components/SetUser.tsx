import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { useUserContext } from "../contexts/UserContext";
import { socket } from "../sockets";
import { Button } from "./general/Button";
import { Input } from "./general/Field";

const SetUser = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const { username, setUsername } = useUserContext();
  const handleSubmit = () => {
    if (inputValue != "ServerCat") {
      setUsername(inputValue);
      socket.emit("user-joined", inputValue);
    } else {
      setInputValue("Cat hacker! 🚨");
    }
  };

  return (
    <section className="border-t border-zinc-800 pt-4">
      <form
        className="flex gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <Input
          autoFocus={true}
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
          className="h-12 w-full rounded-xl bg-zinc-950 font-bold text-white placeholder:font-normal"
          placeholder="Enter your username..."
        ></Input>

        <Button
          type="submit"
          isDisabled={username === ""}
          className="flex size-12 items-center justify-center rounded-xl border-0 bg-rose-500 p-0 shadow-none hover:bg-rose-700"
        >
          <FaCheck />
        </Button>
      </form>
    </section>
  );
};

export default SetUser;
