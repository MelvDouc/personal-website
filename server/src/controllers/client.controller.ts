import { static as expressStatic } from "express";
import { readFile } from "fs/promises";
import { join } from "path";
import { Req, Res } from "../types.js";

const clientDir = join(process.cwd(), "client");

async function home(req: Req, res: Res) {
  try {
    const clientDirProd = (process.env.NODE_ENV === "production")
      ? join(clientDir, "dist")
      : clientDir;
    req.app.use(expressStatic(clientDirProd));
    const data = await readFile(join(clientDirProd, "index.html"));
    res.end(data);
  } catch (error) {
    console.log(error);
    res.end((<Error>error).message);
  }
}

export default {
  home
};