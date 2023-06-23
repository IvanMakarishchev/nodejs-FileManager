import { stat } from "fs/promises";

export const isExists = async (str) => await stat(str).then(() => true).catch(() => false);
