import { static as expressStatic } from "express";
import { readFile } from "fs/promises";
import { join } from "path";
import { Req, Res } from "../types.js";

const clientDir_prod = join(process.cwd(), "client", "dist");

async function home(req: Req, res: Res) {
  try {
    req.app.use(expressStatic(clientDir_prod));
    const data = await readFile(join(clientDir_prod, "index.html"));
    res.end(data);
  } catch (error) {
    console.log(error);
    res.end((<Error>error).message);
  }
}

export default {
  home
};