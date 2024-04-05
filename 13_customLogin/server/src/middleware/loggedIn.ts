import { NextFunction, Request, Response } from "express";

export const loggedIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session?.user) {
    return res.status(401).json("Not logged in");
  }
  next();
};
