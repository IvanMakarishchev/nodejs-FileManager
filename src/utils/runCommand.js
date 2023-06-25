import { run } from "../constants/command-dictionary.js";
import { reducerByType } from "./reducerByType.js";
import { help, messages } from "../constants/messages.js";
import { argController } from "./getArgs.js";

export const runCommand = async (command) => {
  const args = argController.getArgs();
  Object.keys(run).includes(command)
    ? typeof run[command] === "object"
      ? !args.length
        ? console.log(
            `${messages.missedArgs(1)}\n${messages.availableArgs(
              reducerByType(help[command], (a, b) => a + b)
            )}`
          )
        : !args[0].startsWith("--")
        ? console.log(
            `${messages.unknownArgs(args[0])} ${messages.availableArgs(
              reducerByType(help[command], (a, b) => a + b)
            )}`
          )
        : await run[command][args[0].replace("--", "")]()
      : await run[command](args)
    : console.log(
        `${messages.unknownCommand(command)}${messages.availableCommand(
          reducerByType(help, (a, b) => a + b)
        )}`
      );
};
