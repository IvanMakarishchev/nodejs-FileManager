import { exit } from "../modules/exit.js";
import { getOsInfo } from "../modules/os.js";

export const run = {
  cat: (args) => console.log("cat path_to_file\t|\tRead file and print it's content in console (should be done using Readable stream)"),
  add: (args) => console.log("add new_file_name\t|\tCreate empty file in current working directory"),
  rn: (args) => console.log("rn path_to_file new_filename\t|\tRename file"),
  cp: (args) => console.log("cp path_to_file path_to_new_directory\t|\tCopy file"),
  mv: (args) => console.log("mv path_to_file path_to_new_directory\t|\tMove file"),
  rm: (args) => console.log("rm path_to_file\t|\tDelete file"),
  os: {
    EOL: () => getOsInfo('EOL'),
    cpus: () => getOsInfo('cpus'),
    homedir: () => getOsInfo('homedir'),
    username: () => getOsInfo('username'),
    architecture: () => getOsInfo('architecture'),
  },
  hash: (args) => console.log("hash path_to_file\t|\tCalculate hash for file"),
  compress: (args) => console.log("compress path_to_file path_to_destination\t|\tCompress file"),
  decompress: (args) => console.log("decompress path_to_file path_to_destination\t|\tDecompress file"),
  ".exit": () => exit()
}
