import os from "os";
import { colors } from "../constants/environment.js";
import { calcGradient } from "../utils/calcGradient.js";

const osCmd = {
  EOL: () => {
    return `OS EOL: ${JSON.stringify(os.EOL)}`;
  },
  cpus: () => {
    const cpus = os.cpus();
    return cpus.reduce((acc, el, i) => {
      const spd = Math.round(el.speed / 100) / 10;
      return (acc =
        acc +
        `║\x1b[48;2;${colors[i % 2]};38;2;${calcGradient(
          i,
          cpus.length
        )}m  ${i + 1}    ${el.model}   ${" "
          .repeat(4)
          .replace(" ".repeat(4), spd.toFixed(1))} GHz \x1b[0m║\n${
          i === cpus.length - 1
            ? `╚══════${"═".repeat(cpus[0].model.length + 2)}══════════╝`
            : ""
        }`);
    }, `OS CPUS: Total amount: ${cpus.length}\n╔══════${"═".repeat(cpus[0].model.length + 2)}═${"═".repeat(9)}╗\n║ CPU   ${" ".repeat(cpus[0].model.length).replace("     ", "MODEL")}   RATE    ║\n╟──────${"─".repeat(cpus[0].model.length + 2)}──────────╢\n`);
  },
  homedir: () => {
    return `OS Home Directory: ${os.homedir()}`;
  },
  username: () => {
    return `OS User Name: ${os.userInfo().username}`;
  },
  architecture: () => {
    return `OS CPU Architecture: ${os.arch()}`;
  },
};

export const getOsInfo = (str) => {
  console.log(osCmd[str]());
};
