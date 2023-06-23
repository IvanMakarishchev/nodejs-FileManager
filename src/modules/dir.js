import { userDir, colors } from "../constants/environment.js";
import { readdir, stat } from "fs/promises";
import { messages } from "../constants/messages.js";
import { checkPath } from "../utils/checkPath.js";
import { argController } from "../utils/getArgs.js";
import { lstatSync } from "fs";

export class DirController {
  constructor() {
    this.currentDir = userDir;
  }
  // colorize(str, i) {
  //   return `\x1b[38;2;${colors[type][i%2]}m${str}\x1b[0m`;
  // }
  calcGradient(i, count) {
    const step = 1530 / count;
    const currValue = Math.round(step * i);
    let [R, G, B] = [0, 0, 0];
    if (currValue <= 255) {
      R = 255;
      G = currValue;
      B = 0;
    }
    if (currValue > 255 && currValue <= 510) {
      R = 510 - currValue;
      G = 255;
      B = 0
    }
    if (currValue > 510 && currValue <= 765) {
      R = 0;
      G = 255;
      B = currValue - 510;
    }
    if (currValue > 765 && currValue <= 1020) {
      R = 0;
      G = 1020 - currValue;
      B = 255;
    }
    if (currValue > 1020 && currValue <= 1275) {
      R = currValue - 1020;
      G = 0;
      B = 255;
    }
    if (currValue > 1275 && currValue <= 1530) {
      R = 255;
      G = 0;
      B = 1530 - currValue;
    }
    return `${R};${G};${B}`;
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
            `╔${"═".repeat(maxFilesCount + 2)}${"═".repeat(
              maxFileLength + 2
            )}${"═".repeat(maxTypeLength + 3)}╗`
          );
          console.log(
            `║ ${" "
              .repeat(maxFilesCount)
              .replace(" ".repeat(7), "(index)")}  ${" "
              .repeat(maxFileLength)
              .replace(" ".repeat(4), "Name")}   ${" "
              .repeat(maxTypeLength)
              .replace(" ".repeat(4), "Type")} ║`
          );
          console.log(
            `╟${"─".repeat(maxFilesCount + 2)}${"─".repeat(
              maxFileLength + 2
            )}${"─".repeat(maxTypeLength + 3)}╢`
          );
        }
        console.log(
          `║\x1b[48;2;${colors.bg[i%2]};38;2;${this.calcGradient(i, filesSorted.length)}m ${ " "
            .repeat(maxFilesCount)
            .replace(" ".repeat(("" + i).length), i)}  ${" "
            .repeat(maxFileLength)
            .replace(" ".repeat(el.name.length), el.name)}   ${" "
            .repeat(maxTypeLength)
            .replace(" ".repeat(el.type.length), el.type)} \x1b[0m║`
        );
        if (i === filesSorted.length - 1) {
          console.log(
            `╚${"═".repeat(maxFilesCount + 2)}${"═".repeat(
              maxFileLength + 2
            )}${"═".repeat(maxTypeLength + 3)}╝`
          );
        }
      });
    });
  }
  getCurrentDir() {
    return this.currentDir;
  }
}
