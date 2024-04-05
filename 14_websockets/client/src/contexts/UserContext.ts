import { Dispatch, SetStateAction, createContext, useContext } from "react";

export type UserContent = {
  username: string | undefined;
  setUsername: Dispatch<SetStateAction<string | undefined>>;
};

export const UserContext = createContext<UserContent>({
  username: undefined,
  setUsername: () => {},
});

export const useUserContext = () => useContext(UserContext);
