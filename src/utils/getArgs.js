class Args {
  constructor() {
    this.arguments = [];
  }
  setArgs(arg) {
    this.arguments = arg;
    console.log("Arguments setted: " + this.arguments);
  }
  getArgs() {
    return this.arguments;
  }
}

export const argController = new Args();
