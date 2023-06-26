class Args {
  constructor() {
    this.arguments = [];
  }
  setArgs(arg) {
    this.arguments = arg;
  }
  getArgs() {
    return this.arguments;
  }
}

export const argController = new Args();
