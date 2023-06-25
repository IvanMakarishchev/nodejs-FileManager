import { userDir, colors } from "../constants/environment.js";
import { readdir, stat } from "fs/promises";
import { messages } from "../constants/messages.js";
import { isExists } from "../utils/isExists.js";
import { argController } from "../utils/getArgs.js";
import { calcGradient } from "../utils/calcGradient.js";
import { checkFile } from "../utils/checkFile.js";
import { join, dirname } from "path";

export class DirController {
  constructor() {
    this.currentDir = userDir;
  }
  async changeDir() {
    const [target] = argController.getArgs();
    if (!(await isExists(join(this.currentDir, target)))) {
      console.log(messages.unknownDir(target));
      return;
    }
    if (!(await stat(join(this.currentDir, target))).isDirectory()) {
      console.log(messages.unknownDir(target));
      return;
    }
    this.currentDir = join(this.currentDir, target);
  }
  upDir() {
    if (this.currentDir === userDir) {
      console.log(messages.alreadyInRoot());
      return;
    }
    this.currentDir = dirname(this.currentDir);
  }
  async listDir() {
    await readdir(this.currentDir, { withFileTypes: true }).then(
      async (data) => {
        let files = data.map((el) => checkFile(this.currentDir, el.name));
        await Promise.allSettled(files).then((data) => {
          console.log(data);
          const processedFiles = data.map((el) => el.value);
          const maxFileLength = Math.max(
            ...processedFiles.map((el) => el.name.length)
          );
          const maxFilesCount = Math.max(
            `${processedFiles.length - 1}`.length,
            "(index)".length
          );
          const maxTypeLength = Math.max(
            ...processedFiles.map((el) => el.type.length)
          );
          let filesSorted = [
            processedFiles.filter((el) => el.type === "directory"),
            processedFiles.filter((el) => el.type === "block device"),
            processedFiles.filter((el) => el.type === "char device"),
            processedFiles.filter((el) => el.type === "fifo"),
            processedFiles.filter((el) => el.type === "file"),
            processedFiles.filter((el) => el.type === "socket"),
            processedFiles.filter((el) => el.type === "symbolic link"),
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
              `║\x1b[48;2;${colors[i % 2]};38;2;${calcGradient(
                i,
                filesSorted.length
              )}m ${" "
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
    );
  }
  getCurrentDir() {
    return this.currentDir;
  }
}
