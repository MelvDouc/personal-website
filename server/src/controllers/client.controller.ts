import e, { static as expressStatic } from "express";
import { readFile } from "fs/promises";
import { join } from "path";

const clientDir = join(process.cwd(), "client");

async function home(req: e.Request, res: e.Response) {
  try {
    const clientDirProd = (process.env.NODE_ENV === "production")
      ? join(clientDir, "dist")
      : clientDir;
    req.app.use(expressStatic(clientDirProd));
    const data = await readFile(join(clientDirProd, "index.html"));
    res.end(data);
  } catch (error) {
    console.log(error);
    res.contentType("html").end(`
      <h1>Something went wrong...<h1>
      <p style="color: navyblue">${(<Error>error).message}</p>
    `);
  }
}

export default {
  home
};