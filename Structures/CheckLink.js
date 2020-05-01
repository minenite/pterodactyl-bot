const User = require("./Models/User");
class CheckLink {
  constructor(options) {
    this.user = options.user;
  }
  async check() {
    const checker = await User.exists({ id: this.user });
    return checker ? true : false;
  }
}
exports.CheckLink = CheckLink;
