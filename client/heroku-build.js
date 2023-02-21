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

const dirsToDelete = dirs
  .reduce((acc, dir) => {
    (dir !== "dist") && acc.push(`client/${dir}`);
    return acc;
  }, [])
  .join(" ");
await run(`npm --prefix client run build && rm -rf ${dirsToDelete}`);
console.log(dirsToDelete);
console.log("Client was successfully built.");