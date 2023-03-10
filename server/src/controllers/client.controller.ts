import { readFile } from "fs/promises";
import { join } from "path";
import { Req, Res } from "../types.js";

const clientDir = join(process.cwd(), "client");

async function home(req: Req, res: Res) {
  try {
    if (process.env.NODE_ENV !== "production")
      return res.end();
    const data = await readFile(join(clientDir, "dist", "index.html"));
    res.end(data);
  } catch (error) {
    console.log({ clientError: error });
    res
      .contentType("html")
      .end(`
        <h1>Something went wrong...</h1>
        <p>Please try again later.</p>
    `);
  }
}

export default {
  home
};
