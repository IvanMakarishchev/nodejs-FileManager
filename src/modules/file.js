import { isExists } from "../utils/isExists.js";
import { argController } from "../utils/getArgs.js";
import { createReadStream, createWriteStream } from "fs";
import { writeFile, rename, mkdir, unlink, rm } from "fs/promises";
import { checkFile } from "../utils/checkFile.js";
import * as readline from "readline/promises";
import { run } from "../constants/command-dictionary.js";
import { runCommand } from "../utils/runCommand.js";
import { pipeline } from "stream/promises";
import { createHash } from "crypto";
import { createBrotliCompress, createBrotliDecompress } from "zlib";

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
    console.log(await this.readStream(currentDir, fileName));
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
  async copyFile(currentDir) {
    const [fileName, destinationDir] = argController.getArgs();
    if (!(await isExists(`${currentDir}\\${fileName}`))) {
      console.log("Target not exists!");
      return;
    }
    if (await isExists(`${currentDir}\\${destinationDir}\\${fileName}`)) {
      console.log(`File with name ${fileName} already ecrexists!`);
      return;
    }
    if (!(await isExists(`${currentDir}\\${destinationDir}`))) {
      await mkdir(`${currentDir}\\${destinationDir}`).then(() =>
        this.copyFile(currentDir)
      );
    }
    createReadStream(`${currentDir}\\${fileName}`).pipe(
      createWriteStream(`${currentDir}\\${destinationDir}\\${fileName}`)
    );
  }
  async moveFile(currentDir) {
    const [fileName, destinationDir] = argController.getArgs();
    if (!fileName || !destinationDir) {
      console.log("Not enough arguments!");
      return;
    }
    if (!(await isExists(`${currentDir}\\${fileName}`))) {
      console.log("Target not exists!");
      return;
    }
    if (await isExists(`${currentDir}\\${destinationDir}\\${fileName}`)) {
      console.log(`File with name ${fileName} already exists!`);
      return;
    }
    await this.copyFile(currentDir).then(() =>
      rm(`${currentDir}\\${fileName}`)
    );
  }
  async deleteFile(currentDir) {
    const [fileName] = argController.getArgs();
    if (!(await isExists(`${currentDir}\\${fileName}`))) {
      console.log("Target not exists!");
      return;
    }
    await rm(`${currentDir}\\${fileName}`);
  }
  async calcHash(currentDir) {
    const [fileName] = argController.getArgs();
    if (!(await isExists(`${currentDir}\\${fileName}`))) {
      console.log("Target not exists!");
      return;
    }
    this.readStream(currentDir, fileName).then((data) =>
      console.log(createHash("sha256").update(data).digest("hex"))
    );
  }
  async compress(currentDir) {
    const [fileName, destinationDir] = argController.getArgs();
    if (!fileName || !destinationDir) {
      console.log("Not enough arguments!");
      return;
    }
    if (!(await isExists(`${currentDir}\\${fileName}`))) {
      console.log("Target not exists!");
      return;
    }
    if (await isExists(`${currentDir}\\${destinationDir}\\${fileName}.br`)) {
      console.log(`File with name ${fileName} already exists!`);
      return;
    }
    createReadStream(`${currentDir}\\${fileName}`, { encoding: "utf-8" })
      .pipe(createBrotliCompress())
      .pipe(createWriteStream(`${currentDir}\\${destinationDir}\\${fileName}.br`));
  }
  async decompress(currentDir) {
    const [fileName, destinationDir] = argController.getArgs();
    if (!fileName || !destinationDir) {
      console.log("Not enough arguments!");
      return;
    }
    if (!(await isExists(`${currentDir}\\${fileName}`))) {
      console.log("Target not exists!");
      return;
    }
    if (await isExists(`${currentDir}\\${destinationDir}\\${fileName.slice(0, -3)}`)) {
      console.log(`File with name ${fileName} already exists!`);
      return;
    }
    createReadStream(`${currentDir}\\${fileName}`)
      .pipe(createBrotliDecompress())
      .pipe(createWriteStream(`${currentDir}\\${destinationDir}\\${fileName.slice(0, -3)}`));
  }
  readStream(path, name) {
    const input = createReadStream(`${path}\\${name}`, { encoding: "utf-8" });
    return new Promise((res, rej) => {
      input.on("data", (data) => res(data));
      input.on("error", (err) => rej(err));
    });
  }
  writeStream(path, name) {
    const output = createWriteStream(`${path}\\${name}`);
    return new Promise((res, rej) => {
      output.on("data", (data) => res(data));
      output.on("error", (err) => rej(err));
    });
  }
}
