import { lstat } from "fs/promises";
import { join, format, parse } from "path";

const fileTypes = (file) => ({
  directory: file.isDirectory(),
  file: file.isFile(),
  "block device": file.isBlockDevice(),
  "char device": file.isCharacterDevice(),
  fifo: file.isFIFO(),
  socket: file.isSocket(),
  "symbolic link": file.isSymbolicLink(),
});

export const checkFile = async (target) => {
  return await lstat(join(target)).then((data) => 
  ({
    name: parse(target).base,
    type: Object.entries(fileTypes(data)).find((el) => el[1])[0],
  })
  );
};
