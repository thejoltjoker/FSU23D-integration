import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { User } from "../schemas/UserSchema";
import { readUsers, writeUsers } from "../services/user.service";

interface RegisterRequest extends Request {
  body: {
    email: string;
    password: string;
  };
}

export const register = async (req: RegisterRequest, res: Response) => {
  const { email, password } = req.body;
  console.log(req.body);
  const users = await readUsers();
  const existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    return res.status(409).json("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const newUser: User = { email: email, password: hashedPassword };

  users.push(newUser);
  await writeUsers(users);

  res.status(201).json("User created");
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const users = await readUsers();
  const existingUser = users.find((user) => user.email === email);
  if (
    !existingUser ||
    !(await bcrypt.compare(password, existingUser.password))
  ) {
    return res.status(400).json("Invalid user or password");
  }

  req.session!.user = existingUser;

  res.status(200).json(existingUser.email);
};

export const logout = async (req: Request, res: Response) => {
  req.session = null;
  res.status(200).json("Logged out");
};

export const authorize = async (req: Request, res: Response) => {
  if (!req.session?.user) {
    return res.status(401).json("Not logged in");
  }
  res.status(200).json(req.session.user);
};
