import { username } from "../utils/getUser.js"

export const help = {
  cat: "cat path_to_file\t\t\t\t|\tRead file and print it's content\n",
  add: "add new_file_name\t\t\t\t|\tCreate empty file in current working directory\n",
  rn: "rn path_to_file new_filename\t\t\t|\tRename file\n",
  cp: "cp path_to_file path_to_new_directory\t\t|\tCopy file\n",
  mv: "mv path_to_file path_to_new_directory\t\t|\tMove file\n",
  rm: "rm path_to_file\t\t\t\t\t|\tDelete file\n\n",
  os: {
    EOL: "\t--EOL\t\t\t\t\t|\tGet EOL\n",
    cpus: "\t--cpus\t\t\t\t\t|\tGet host machine CPUs info\n",
    homedir: "\t--homedir\t\t\t\t|\tGet home directory\n",
    username: "\t--username\t\t\t\t|\tGet current system user name\n",
    architecture: "\t--architecture\t\t\t\t|\tGet CPU architecture for which Node.js binary has compiled\n\n",
  },
  hash: "hash path_to_file\t\t\t\t|\tCalculate hash for file\n",
  compress: "compress path_to_file path_to_destination\t|\tCompress file\n",
  decompress: "decompress path_to_file path_to_destination\t|\tDecompress file\n"
}

export const messages = {
  unknownCommand: (command) => `Unknown command: "${command}"\n`,
  unknownArgs: (arg) => `Unknown argument: "${arg}"`,
  availableCommand: (commands) => `Available commands: \n${commands}`,
  availableArgs: (arg) => `Available arguments: ${arg}`,
  currentPath: (directoryPath) => `You are currently in ${directoryPath}`,
  greet: () => `Welcome to the File Manager, ${username}!\n`,
  bye: () => `Thank you for using File Manager, ${username}, goodbye!\n`
}