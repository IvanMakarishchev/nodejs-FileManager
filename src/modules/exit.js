import { messages } from "../constants/messages.js";

export const exit = () => {
  process.stdout.write(messages.bye());
  process.exit(0);
}