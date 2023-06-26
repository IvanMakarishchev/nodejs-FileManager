import { argController } from "../utils/getArgs.js";
import { createReadStream, createWriteStream } from "fs";
import { writeFile, rename, mkdir, rm } from "fs/promises";
import { createHash } from "crypto";
import { createBrotliCompress, createBrotliDecompress } from "zlib";
import { join, parse } from "path";
import {
  checkTarget,
  enoughArgs,
  isSuitableType,
  targetExists,
  targetNotExists,
} from "../utils/checkErrors.js";

export class FileOperations {
  constructor() {}

  setCopyName = async (filePath) => {
    if (!(await checkTarget(filePath))) {
      return this.setCopyName(
        join(
          `${parse(filePath).dir}`,
          `${parse(filePath).name}-copy${parse(filePath).ext}`
        )
      );
    }
    return filePath;
  };

  async openFile(currentDir) {
    const [fileName] = argController.getArgs();
    if (!(await enoughArgs(fileName))) return;
    const target = join(currentDir, fileName);
    if ((await targetExists(target)) && (await isSuitableType(target))) {
      console.log(await this.createStream(target));
    }
  }

  async createFile(currentDir) {
    const [fileName] = argController.getArgs();
    if (!(await enoughArgs(fileName))) return;
    const target = join(currentDir, fileName);
    if (await targetNotExists(target))
      await writeFile(join(currentDir, fileName), "");
  }

  async renameFile(currentDir) {
    const [oldName, newName] = argController.getArgs();
    if (!(await enoughArgs(oldName, newName))) return;
    const source = join(currentDir, oldName);
    const target = join(currentDir, newName);
    if (await targetExists(source))
      await this.setCopyName(target).then(async (data) => {
        await rename(source, data);
      });
  }

  async copyFile(currentDir) {
    const [fileName, destinationDir] = argController.getArgs();
    if (!(await enoughArgs(fileName, destinationDir))) return;
    const source = join(currentDir, fileName);
    const target = join(currentDir, destinationDir, fileName);
    if (await targetExists(source)) {
      if (await checkTarget(join(currentDir, destinationDir))) {
        await mkdir(join(currentDir, destinationDir));
      }
      await this.setCopyName(target).then((data) => {
        createReadStream(source).pipe(createWriteStream(data));
      });
    }
  }

  async moveFile(currentDir) {
    const [fileName, destinationDir] = argController.getArgs();
    if (!(await enoughArgs(fileName, destinationDir))) return;
    const source = join(currentDir, fileName);
    const target = join(currentDir, destinationDir, fileName);
    if (await targetExists(source))
      await this.copyFile(currentDir).then(() => this.deleteFile(currentDir));
  }

  async deleteFile(currentDir) {
    const [fileName] = argController.getArgs();
    if (!(await enoughArgs(fileName))) return;
    const target = join(currentDir, fileName);
    if (await targetExists(target))
      await rm(join(currentDir, fileName), { recursive: true, force: true });
  }

  async calcHash(currentDir) {
    const [fileName] = argController.getArgs();
    if (!(await enoughArgs(fileName))) return;
    const target = join(currentDir, fileName);
    if (await targetExists(target))
      await this.createStream(target).then((data) =>
        console.log(createHash("sha256").update(data).digest("hex"))
      );
  }

  async compress(currentDir) {
    const [fileName, destinationDir] = argController.getArgs();
    if (!(await enoughArgs(fileName, destinationDir))) return;
    const source = join(currentDir, fileName);
    const target = join(join(currentDir, destinationDir, fileName) + `.br`);
    if ((await targetExists(source)) && (await targetNotExists(target))) {
      if (await checkTarget(join(currentDir, destinationDir))) {
        await mkdir(join(currentDir, destinationDir));
      }
      createReadStream(source, { encoding: "utf-8" })
        .pipe(createBrotliCompress())
        .pipe(createWriteStream(target));
    }
  }

  async decompress(currentDir) {
    const [fileName, destinationDir] = argController.getArgs();
    if (!(await enoughArgs(fileName, destinationDir))) return;
    const source = join(currentDir, fileName);
    const target = join(currentDir, destinationDir, fileName).slice(0, -3);
    if ((await targetExists(source)) && (await targetNotExists(target))) {
      if (await checkTarget(join(currentDir, destinationDir))) {
        await mkdir(join(currentDir, destinationDir));
      }
      createReadStream(source)
        .pipe(createBrotliDecompress())
        .pipe(createWriteStream(target));
    }
  }

  createStream(path) {
    const stream = createReadStream(path, { encoding: "utf-8" });
    return new Promise((res, rej) => {
      stream.on("data", (data) => res(data));
      stream.on("error", (err) => rej(err));
    });
  }
}
