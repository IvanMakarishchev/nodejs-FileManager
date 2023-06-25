import { lstat } from "fs/promises";

const fileTypes = (file) => ({
  directory: file.isDirectory(),
  file: file.isFile(),
  "block device": file.isBlockDevice(),
  "char device": file.isCharacterDevice(),
  fifo: file.isFIFO(),
  socket: file.isSocket(),
  "symbolic link": file.isSymbolicLink(),
});

export const checkFile = async (path, name) => {
  return await lstat(`${path}\\${name}`).then((data) => ({
    name: name,
    type: Object.entries(fileTypes(data)).find((el) => el[1])[0],
  }));
};
