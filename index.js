import { userDir } from "./src/constants/environment.js";
import { messages } from "./src/constants/messages.js";
import { exit } from "./src/modules/exit.js";
import { argController } from "./src/utils/getArgs.js";
import { runCommand } from "./src/utils/runCommand.js";

const startFM = async () => {
  console.log(`${messages.greet()}`);
  console.log(messages.currentPath(userDir));
  process.stdin.on("data", async (data) => {
    const fullCommand = data.toString().trim();
    let processedCmd = fullCommand.split(" ").join(",");
    if (fullCommand.includes('"')) {
      const spaceCmd = Array.from(
        fullCommand.matchAll(/"[^"]*"/g),
        (m) => m[0]
      );
      Array.from(
        fullCommand.replaceAll(" ", ",").matchAll(/"[^"]*"/g),
        (m) => m[0]
      ).forEach(
        (el, i) => (processedCmd = processedCmd.replace(el, spaceCmd[i]))
      );
    }
    const [command, ...args] = processedCmd.replaceAll('"', "").split(",");
    argController.setArgs(args);
    await runCommand(command).then(() => runCommand("currentDir"));
  });
  process.on("SIGINT", () => exit());
};

await startFM();