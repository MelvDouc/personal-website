import { Request, Response } from "express";
import { readFile } from "fs/promises";
import { join } from "path";

const clientDir = join(process.cwd(), "client");

async function home(req: Request, res: Response) {
  try {
    const data = await readFile(join(clientDir, "dist", "index.html"));
    res.end(data);
  } catch (error) {
    console.log(error);
    res.contentType("html").end(`
      <h1>Something went wrong...</h1>
      <p style="color: navy">${(<Error>error).message}</p>
    `);
  }
}

export default {
  home
};