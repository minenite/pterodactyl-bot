const Event = require("../Structures/Event");
const Guild = require("../Structures/Models/Guild");
const Settings = require("../settings.json");
module.exports = class Ready extends Event.Event {
  constructor() {
    super("guildCreate");
  }
  async exec(client, guild) {
    return new Guild.default({
      id: guild.id,
      prefix: Settings.defaultPrefix,
      staff: [],
    }).save();
  }
};
