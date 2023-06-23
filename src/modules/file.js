import { isExists } from "../utils/isExists.js";
import { argController } from "../utils/getArgs.js";
import { createReadStream, createWriteStream } from 'fs';

export class FileOperations {
  constructor() {
  }
  async openFile(currentDir) {
    const [fileName,] = argController.getArgs();
    if (!(await isExists(`${currentDir}\\${fileName}`))) {
      console.log(false)
    } else {
      console.log(true)
    }
  }
}
