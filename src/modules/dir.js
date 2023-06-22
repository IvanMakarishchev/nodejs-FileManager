import { userDir } from "../constants/environment.js";
import { readdir, stat } from "fs/promises";
import { messages } from "../constants/messages.js";
import { checkPath } from "../utils/checkPath.js";
import { argController } from "../utils/getArgs.js";
import { lstatSync } from "fs";

export class DirController {
  constructor() {
    this.currentDir = userDir;
  }
  async changeDir() {
    const dirName = argController.getArgs()[0];
    if (!(await checkPath(`${this.currentDir}\\${dirName}`))) {
      console.log(messages.unknownDir(dirName));
    } else {
      (await stat(`${this.currentDir}\\${dirName}`)).isDirectory()
        ? (this.currentDir = `${this.currentDir}\\${dirName}`)
        : console.log(messages.unknownDir(dirName));
    }
  }
  upDir() {
    this.currentDir === userDir
      ? console.log(messages.alreadyInRoot())
      : (this.currentDir = this.currentDir.split("\\").slice(0, -1).join("\\"));
  }
  async listDir() {
    await readdir(this.currentDir, { withFileTypes: true }).then((data) => {
      let files = data.map((el) => {
        const stat = lstatSync(`${this.currentDir}\\${el.name}`);
        const pathType = {
          directory: stat.isDirectory() ? true : false,
          file: stat.isFile() ? true : false,
          "block device": stat.isBlockDevice() ? true : false,
          "char device": stat.isCharacterDevice() ? true : false,
          fifo: stat.isFIFO() ? true : false,
          socket: stat.isSocket() ? true : false,
          "symbolic link": stat.isSymbolicLink() ? true : false,
        };
        return {
          name: el.name,
          type: Object.entries(pathType).find((el) => el[1])[0],
        };
      });
      const maxFileLength = Math.max(...files.map((el) => el.name.length));
      const maxFilesCount = Math.max(
        `${files.length - 1}`.length,
        "(index)".length
      );
      const maxTypeLength = Math.max(...files.map((el) => el.type.length));
      let filesSorted = [
        files.filter((el) => el.type === "directory"),
        files.filter((el) => el.type === "block device"),
        files.filter((el) => el.type === "char device"),
        files.filter((el) => el.type === "fifo"),
        files.filter((el) => el.type === "file"),
        files.filter((el) => el.type === "socket"),
        files.filter((el) => el.type === "symbolic link"),
      ].flat();
      filesSorted.forEach((el, i) => {
        if (!i) {
          console.log(
            `╔${"═".repeat(maxFilesCount + 2)}╤${"═".repeat(
              maxFileLength + 2
            )}╤${"═".repeat(maxTypeLength + 2)}╗`
          );
          console.log(
            `║ ${" "
              .repeat(maxFilesCount)
              .replace(" ".repeat(7), "(index)")} │ ${" "
              .repeat(maxFileLength)
              .replace(" ".repeat(4), "Name")} │ ${" "
              .repeat(maxTypeLength)
              .replace(" ".repeat(4), "Type")} ║`
          );
          console.log(
            `╟${"─".repeat(maxFilesCount + 2)}┼${"─".repeat(
              maxFileLength + 2
            )}┼${"─".repeat(maxTypeLength + 2)}╢`
          );
        }
        console.log(
          `║ ${" "
            .repeat(maxFilesCount)
            .replace(" ".repeat(("" + i).length), i)} │ ${" "
            .repeat(maxFileLength)
            .replace(" ".repeat(el.name.length), el.name)} │ ${" "
            .repeat(maxTypeLength)
            .replace(" ".repeat(el.type.length), el.type)} ║`
        );
        if (i === filesSorted.length - 1) {
          console.log(
            `╚${"═".repeat(maxFilesCount + 2)}╧${"═".repeat(
              maxFileLength + 2
            )}╧${"═".repeat(maxTypeLength + 2)}╝`
          );
        }
      });
    });
  }
  getCurrentDir() {
    return this.currentDir;
  }
}
