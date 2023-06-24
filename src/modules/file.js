import { isExists } from "../utils/isExists.js";
import { argController } from "../utils/getArgs.js";
import { createReadStream, createWriteStream } from "fs";
import { writeFile } from "fs/promises";
import { checkFile } from "../utils/checkFile.js";
import { run } from "../constants/command-dictionary.js";
import { runCommand } from "../utils/runCommand.js";

export class FileOperations {
  constructor() {}
  async openFile(currentDir) {
    const [fileName] = argController.getArgs();
    if (!(await isExists(`${currentDir}\\${fileName}`))) {
      console.log("Target not exists!");
      return;
    }
    if ((await checkFile(currentDir, fileName)).type !== "file") {
      console.log("Target is not a file!");
      return;
    }
    console.log(await this.readStream(`${currentDir}\\${fileName}`));
  }
  async createFile(currentDir) {
    const [fileName] = argController.getArgs();
    if (await isExists(`${currentDir}\\${fileName}`)) {
      console.log("File already exists!");
      return;
    }
    await writeFile(`${currentDir}\\${fileName}`, "");
  }
  readStream(path) {
    const input = createReadStream(path, { encoding: "utf-8" });
    return new Promise((res, rej) => {
      input.on("data", (data) => res(data));
      input.on("error", (err) => rej(err));
    });
  }
}
