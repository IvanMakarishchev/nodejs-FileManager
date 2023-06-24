import { isExists } from "../utils/isExists.js";
import { argController } from "../utils/getArgs.js";
import { createReadStream, createWriteStream } from "fs";
import { writeFile, rename } from "fs/promises";
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
      console.log(`File with name ${fileName} already exists!`);
      return;
    }
    await writeFile(`${currentDir}\\${fileName}`, "");
  }
  async renameFile(currentDir) {
    const [oldName, newName] = argController.getArgs();
    if (!oldName || !newName) {
      console.log("Not enough arguments!");
      return;
    }
    if (oldName === newName) {
      console.log("You trying to rename a file with the same name!");
      return;
    }
    if (!(await isExists(`${currentDir}\\${oldName}`))) {
      console.log("Target not exists!");
      return;
    }
    if (await isExists(`${currentDir}\\${newName}`)) {
      console.log(`File with name ${newName} already exists!`);
      return;
    }
    await rename(`${currentDir}\\${oldName}`, `${currentDir}\\${newName}`);
  }
  readStream(path) {
    const input = createReadStream(path, { encoding: "utf-8" });
    return new Promise((res, rej) => {
      input.on("data", (data) => res(data));
      input.on("error", (err) => rej(err));
    });
  }
}
