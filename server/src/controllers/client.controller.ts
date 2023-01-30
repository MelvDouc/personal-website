import { readFile } from "fs/promises";
import { join } from "path";
import { Req, Res } from "../types.js";

const clientDir = join(process.cwd(), "client");

async function home(req: Req, res: Res) {
  try {
    console.log("here");
    const data = await readFile(join(clientDir, "dist", "index.html"));
    res.end(data);
  } catch (error) {
    res.end((<Error>error).message);
  }
}

export default {
  home
};