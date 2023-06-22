import { userDir } from "../constants/environment.js";
import { readdir } from "fs/promises";
import { messages } from "../constants/messages.js";
import { checkPath } from "../utils/checkPath.js";
import { argController } from "../utils/getArgs.js";

export class DirController {
  constructor() {
    this.currentDir = userDir;
  }
  async changeDir() {
    const dirName = argController.getArgs()[0];
    if (!(await checkPath(`${this.currentDir}\\${dirName}`))) {
      console.log(messages.unknownDir(dirName));
    } else {
      this.currentDir = `${this.currentDir}\\${dirName}`;
    }
  }
  upDir() {
    this.currentDir === userDir
      ? console.log(messages.alreadyInRoot())
      : (this.currentDir = this.currentDir.split("\\").slice(0, -1).join("\\"));
  }
  async listDir() {
    await readdir(this.currentDir, { withFileTypes: true }).then((data) =>
      console.log(data.length)
    );
  }
  getCurrentDir() {
    return this.currentDir;
  }
}
