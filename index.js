import { run } from "./src/constants/command-dictionary.js";
import { messages, help } from "./src/constants/messages.js";
import { exit } from "./src/modules/exit.js";
import { reducerByType } from "./src/utils/reducerByType.js";

const startFM = async () => {
  console.log(`${messages.greet()}`);
  process.stdin.on("data", (data) => {
    const fullCommand = data.toString().trim().split(' ');
    const command = fullCommand[0];
    const args = fullCommand.splice(1);
    Object.keys(run).includes(command)
      ? run[command](args)
      : console.log(
          `${messages.unknownCommand(command)}${messages.availableCommand(
            reducerByType(Object.entries(help), (a, b) => a + b)
          )}`
        );
  });
  process.on('SIGINT', () => exit());
};

await startFM();
