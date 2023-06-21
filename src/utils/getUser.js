class User {
  constructor() {
    this.currentUser = null;
  }
  setUser() {
    this.currentUser = process.argv
      .find((el) => el.startsWith("--username"))
      .split("=")
      .pop();
    return this.getUser();
  }
  getUser() {
    return this.currentUser === null ? this.setUser() : this.currentUser;
  }
}

export const username = new User().getUser();