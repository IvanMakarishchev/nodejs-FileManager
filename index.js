import { run } from "./src/constants/command-dictionary.js";
import { userDir } from "./src/constants/environment.js";
import { messages } from "./src/constants/messages.js";
import { exit } from "./src/modules/exit.js";
import { argController } from "./src/utils/getArgs.js";
import { runCommand } from "./src/utils/runCommand.js";

const startFM = async () => {
  console.log("home directory: ", userDir);
  console.log(`${messages.greet()}`);
  process.stdin.on("data", async (data) => {
    const fullCommand = data.toString().trim().split(" ");
    const [command, ...args] = fullCommand;
    argController.setArgs(args);
    await runCommand(command).then(() => runCommand('currentDir'));
  });
  process.on("SIGINT", () => exit());
};

await startFM();
