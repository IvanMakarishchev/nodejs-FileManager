import { lstat } from "fs/promises";

export const checkFile = async (path, name) => {
  return await lstat(`${path}\\${name}`).then((data) => ({
    name: name,
    type: data.isDirectory()
      ? "directory"
      : data.isFile()
      ? "file"
      : data.isBlockDevice()
      ? "block device"
      : data.isCharacterDevice()
      ? "char device"
      : data.isFIFO()
      ? "fifo"
      : data.isSocket()
      ? "socket"
      : "symbolic link",
  }));
};
