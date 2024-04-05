import fs from "fs/promises";
import { User } from "../schemas/UserSchema";

export const readUsers = async (): Promise<User[]> => {
  const data = await fs.readFile("./data/users.json", "utf-8");
  const users: User[] = JSON.parse(data);
  return users;
};

export const writeUsers = async (users: User[]) => {
  await fs.writeFile("./data/users.json", JSON.stringify(users, null, 2));
};
