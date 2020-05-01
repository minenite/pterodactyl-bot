const User = require("./Models/User");
class LinkCreator {
  constructor(options) {
    this.user = options.user;
    this.token = options.token;
    this.username = options.username || null;
    this.email = options.email || null;
  }
  async saveToDatabase() {
    let newUser = await new User.default({
      userID: this.user,
      token: this.token,
      username: this.username,
      email: this.email,
    });
    newUser.save();
    return this;
  }
}
exports.LinkCreator = LinkCreator;
