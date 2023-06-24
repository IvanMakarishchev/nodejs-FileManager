import { exit } from "../modules/exit.js";
import { getOsInfo } from "../modules/os.js";
import { DirController } from "../modules/dir.js";
import { FileOperations } from "../modules/file.js";

const dirController = new DirController();
const fileOperations = new FileOperations();

export const run = {
  currentDir: () => console.log(`You are currently in ${dirController.getCurrentDir()}`),
  up: () => dirController.upDir(),
  cd: () => dirController.changeDir(),
  ls: () => dirController.listDir(),
  cat: () => fileOperations.openFile(dirController.getCurrentDir()),
  add: () => fileOperations.createFile(dirController.getCurrentDir()),
  rn: () => fileOperations.renameFile(dirController.getCurrentDir()),
  cp: () => fileOperations.copyFile(dirController.getCurrentDir()),
  mv: () => fileOperations.moveFile(dirController.getCurrentDir()),
  rm: () => fileOperations.deleteFile(dirController.getCurrentDir()),
  os: {
    EOL: () => getOsInfo('EOL'),
    cpus: () => getOsInfo('cpus'),
    homedir: () => getOsInfo('homedir'),
    username: () => getOsInfo('username'),
    architecture: () => getOsInfo('architecture'),
  },
  hash: () => fileOperations.calcHash(dirController.getCurrentDir()),
  compress: () => fileOperations.compress(dirController.getCurrentDir()),
  decompress: () => fileOperations.decompress(dirController.getCurrentDir()),
  ".exit": () => exit()
}
