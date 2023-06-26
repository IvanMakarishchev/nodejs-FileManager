import { messages } from "../constants/messages.js";
import { checkFile } from "./checkFile.js";
import { isExists } from "./isExists.js";

export const targetExists = async (target) => {
  if (!(await isExists(target))) {
    console.log(messages.notExist(target));
    return false;
  }
  return true;
};

export const targetNotExists = async (target) => {
  if (await isExists(target)) {
    console.log(messages.alreadyExist(target));
    return false;
  }
  return true;
};

export const checkTarget = async (target) => {
  if (await isExists(target)) {
    return false;
  }
  return true;
};

export const isSuitableType = async (target) => {
  if ((await checkFile(target)).type !== "file") {
    console.log(messages.notFile(target));
    return false;
  }
  return true;
};

export const enoughArgs = async (...args) => {
  if (args.includes(undefined)) {
    console.log(
      messages.missedArgs(args.length - args.filter((el) => el).length)
    );
    return false;
  }
  return true;
};
