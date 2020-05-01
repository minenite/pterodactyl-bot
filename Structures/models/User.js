const mongoose = require("mongoose");
const UserModel = mongoose.model(
  "User",
  new mongoose.Schema(
    {
      userID: String,
      token: String,
      username: String,
      email: String,
    },
    { collection: "users" }
  )
);
exports.default = UserModel;
