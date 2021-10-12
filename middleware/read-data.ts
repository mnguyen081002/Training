import { NextFunction, Request, Response } from "express";
import fs from "fs";
import path from "../constant";

export interface AccountData {
  username: string;
  password?: string;
  token?: string;
}
const readData = (req: Request, res: Response, next: NextFunction) => {
  let accounts: Array<AccountData> = [];
  if (fs.existsSync(path)) {
    const file = fs.readFileSync(path, "utf8");
    const json = JSON.parse(file);
    accounts = json;
  }
  res.locals.accounts = accounts;
  next();
};
export default readData;
