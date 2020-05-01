const mongoose = require("mongoose");
const GuildModel = mongoose.model(
  "Guild",
  new mongoose.Schema(
    {
      id: String,
      prefix: String,
      staff: Array,
    },
    { collection: "guilds" }
  )
);
exports.default = GuildModel;
