import os from "os";

const osCmd = {
  EOL: () => {
    return `OS EOL: ${JSON.stringify(os.EOL)}\n`;
  },
  cpus: () => {
    const cpus = os.cpus();
    return cpus.reduce(
      (acc, el, i) =>
        acc +
        `║  ${i + 1}  │ ${el.model} │ ${Math.round(el.speed / 100) / 10} GHz ║\n${
          i === cpus.length - 1
            ? `╚═════╧${"═".repeat(cpus[0].model.length + 2)}╧═════════╝\n`
            : ""
        }`,
      `OS CPUS: Total amount: ${cpus.length}\n╔═════╤${"═".repeat(
        cpus[0].model.length + 2
      )}╤═════════╗\n║ CPU │ ${" "
        .repeat(cpus[0].model.length)
        .replace("     ", "MODEL")} │ RATE    ║\n╟─────┼${"─".repeat(
        cpus[0].model.length + 2
      )}┼─────────╢\n`
    );
  },
  homedir: () => {
    return `OS Home Directory: ${os.homedir()}`;
  },
  username: () => {
    return `OS User Name: ${os.userInfo().username}`;
  },
  architecture: () => {
    return `OS CPU Architecture: ${os.arch()}`
  }
}

export const getOsInfo = (str) => {
  console.log(osCmd[str]());
}
