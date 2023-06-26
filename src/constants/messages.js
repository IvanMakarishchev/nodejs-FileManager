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
  unknownCommand: (command) => `\x1b[91mUnknown command: "${command}"\n\x1b[0m`,
  unknownArgs: (wrongArg) => `\x1b[91mUnknown argument: "${wrongArg}"!\x1b[0m`,
  missedArgs: (n) => `\x1b[91mArgument missed! Required ${n} more argument(s)!\x1b[0m`,
  availableCommand: (commands) => `\x1b[93mAvailable commands:\x1b[0m\n${commands}`,
  availableArgs: (arg) => `\x1b[93mAvailable arguments:\x1b[0m\n${arg}`,
  currentPath: (directoryPath) => `\x1b[91mYou are currently in ${directoryPath}\x1b[0m`,
  unknownDir: (dirName) => `\x1b[91mUnknown directory name ${dirName}\x1b[0m`,
  alreadyInRoot: () => `\x1b[91mCannot go upper, you are in root directory!\x1b[0m`,
  notExist: (name) => `\x1b[91m${name} not exists!\x1b[0m`,
  notFile: (name) => `\x1b[91m${name} not a file type!\x1b[0m`,
  alreadyExist: (name) => `\x1b[91mFile ${name} already exists!\x1b[0m`,
  greet: () => `\x1b[92mWelcome to the File Manager, ${username}!\n\x1b[0m`,
  bye: () => `\x1b[92mThank you for using File Manager, ${username}, goodbye!\n\x1b[0m`
}