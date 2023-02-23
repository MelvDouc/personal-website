import { exec } from "child_process";
import { readdir } from "fs/promises";
import { resolve, join } from "path";
import { promisify } from "util";

const run = promisify(exec);
const root = resolve(".");
const dirs = await readdir(join(root, "client"));

if (!dirs.includes("node_modules")) {
  console.log("Installing client/node_modules...");
  await run("npm --prefix client install");
}

await run(`npm --prefix client run build && rm -rf ${dirs.map(dir => `client/${dir}`).join(" ")}`);
console.log("Client was successfully built.");