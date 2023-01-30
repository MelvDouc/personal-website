/**
 * This is a build file to run when building the client app on Heroku.
 */
import { promisify } from "util";
import { readdir } from "fs/promises";
import { exec } from "child_process";

const runCommand = promisify(exec);

const dirents = await readdir(".", { withFileTypes: true });
const hasNodeModules = dirents.some((dirent) => dirent.isDirectory() && dirent.name === "node_modules");
if (!hasNodeModules)
  await runCommand("npm install --save-dev vite@3.1.0 typescript@4.9.4 reactfree-jsx@1.2.2");

await runCommand("npm run build");
console.log("Client was successfully built.");