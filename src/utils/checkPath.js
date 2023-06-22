import { stat } from "fs/promises";

export const checkPath = async (str) => await stat(str).then(() => true).catch(() => false);
