import { run } from "./src/constants/command-dictionary.js";
import { messages, help } from "./src/constants/messages.js";
import { exit } from "./src/modules/exit.js";
import { reducerByType } from "./src/utils/reducerByType.js";

const startFM = async () => {
  console.log(`${messages.greet()}`);
  process.stdin.on("data", (data) => {
    const fullCommand = data.toString().trim().split(" ");
    const command = fullCommand[0];
    const args = fullCommand.splice(1);
    Object.keys(run).includes(command)
      ? typeof run[command] === "object"
        ? !args.length
          ? console.log(
              `${messages.missedArgs()} ${messages.availableArgs(
                reducerByType(help[command], (a, b) => a + b)
              )}`
            )
          : !args[0].startsWith("--")
          ? console.log(
              `${messages.unknownArgs(args[0])} ${messages.availableArgs(
                reducerByType(help[command], (a, b) => a + b)
              )}`
            )
          : run[command][args.join("").replace("--", "")]()
        : run[command](args)
      : console.log(
          `${messages.unknownCommand(command)}${messages.availableCommand(
            reducerByType(help, (a, b) => a + b)
          )}`
        );
  });
  process.on("SIGINT", () => exit());
};

await startFM();
