import { isExists } from "../utils/isExists.js";
import { argController } from "../utils/getArgs.js";
import { createReadStream, createWriteStream } from "fs";
import { writeFile, rename, mkdir, unlink, rm } from "fs/promises";
import { checkFile } from "../utils/checkFile.js";
import { createHash } from "crypto";
import { createBrotliCompress, createBrotliDecompress } from "zlib";
import { join } from "path";

export class FileOperations {
  constructor() {}
  async openFile(currentDir) {
    const [fileName] = argController.getArgs();
    if (!(await isExists(join(currentDir, fileName)))) {
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
    if (await isExists(join(currentDir, fileName))) {
      console.log(`File with name ${fileName} already exists!`);
      return;
    }
    await writeFile(join(currentDir, fileName), "");
  }
  async renameFile(currentDir) {
    const [oldName, newName] = argController.getArgs();
    if (!oldName || !newName) {
      console.log("Not enough arguments!");
      return;
    }
    if (!(await isExists(join(currentDir, oldName)))) {
      console.log("Target not exists!");
      return;
    }
    if (await isExists(join(currentDir, newName))) {
      console.log(`File with name ${newName} already exists!`);
      return;
    }
    await rename(join(currentDir, oldName), join(currentDir, newName));
  }
  async copyFile(currentDir) {
    const [fileName, destinationDir] = argController.getArgs();
    if (!(await isExists(join(currentDir, fileName)))) {
      console.log("Target not exists!");
      return;
    }
    if (await isExists(join(currentDir, destinationDir, fileName))) {
      console.log(`File with name ${fileName} already ecrexists!`);
      return;
    }
    if (!(await isExists(join(currentDir, destinationDir)))) {
      await mkdir(join(currentDir, destinationDir)).then(() =>
        this.copyFile(currentDir)
      );
    }
    createReadStream(join(currentDir, fileName)).pipe(
      createWriteStream(join(currentDir, destinationDir, fileName))
    );
  }
  async moveFile(currentDir) {
    const [fileName, destinationDir] = argController.getArgs();
    if (!fileName || !destinationDir) {
      console.log("Not enough arguments!");
      return;
    }
    if (!(await isExists(join(currentDir, fileName)))) {
      console.log("Target not exists!");
      return;
    }
    if (await isExists(join(currentDir, destinationDir, fileName))) {
      console.log(`File with name ${fileName} already exists!`);
      return;
    }
    await this.copyFile(currentDir).then(() => rm(join(currentDir, fileName)));
  }
  async deleteFile(currentDir) {
    const [fileName] = argController.getArgs();
    if (!(await isExists(join(currentDir, fileName)))) {
      console.log("Target not exists!");
      return;
    }
    await rm(join(currentDir, fileName), { recursive: true, force: true });
  }
  async calcHash(currentDir) {
    const [fileName] = argController.getArgs();
    if (!(await isExists(join(currentDir, fileName)))) {
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
    if (!(await isExists(join(currentDir, fileName)))) {
      console.log("Target not exists!");
      return;
    }
    if (await isExists(join(currentDir, destinationDir, fileName) + `.br`)) {
      console.log(`File with name ${fileName} already exists!`);
      return;
    }
    createReadStream(join(currentDir, fileName), { encoding: "utf-8" })
      .pipe(createBrotliCompress())
      .pipe(
        createWriteStream(join(currentDir, destinationDir, fileName) + `.br`)
      );
  }
  async decompress(currentDir) {
    const [fileName, destinationDir] = argController.getArgs();
    if (!fileName || !destinationDir) {
      console.log("Not enough arguments!");
      return;
    }
    if (!(await isExists(join(currentDir, fileName)))) {
      console.log("Target not exists!");
      return;
    }
    if (
      await isExists(join(currentDir, destinationDir, fileName).slice(0, -3))
    ) {
      console.log(`File with name ${fileName} already exists!`);
      return;
    }
    createReadStream(join(currentDir, fileName))
      .pipe(createBrotliDecompress())
      .pipe(
        createWriteStream(
          join(currentDir, destinationDir, fileName).slice(0, -3)
        )
      );
  }
  readStream(path, name) {
    const input = createReadStream(join(path, name), { encoding: "utf-8" });
    return new Promise((res, rej) => {
      input.on("data", (data) => res(data));
      input.on("error", (err) => rej(err));
    });
  }
  writeStream(path, name) {
    const output = createWriteStream(join(path, name));
    return new Promise((res, rej) => {
      output.on("data", (data) => res(data));
      output.on("error", (err) => rej(err));
    });
  }
}
