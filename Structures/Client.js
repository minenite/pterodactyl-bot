const Discord = require("discord.js");
const Handlers = require("./Handlers");
const mongoose = require("mongoose");
const Config = require("./Config");
const Settings = require("../settings.json");
class Panel extends Discord.Client {
  constructor(token, clientOptions) {
    super(clientOptions);
    this.token = token;
    this.aliases = new Discord.Collection();
    this.commands = new Discord.Collection();
    this.events = new Discord.Collection();
    this.color = Settings.embed.color.default;
    this.error = Settings.embed.color.error;
    this.config = Config.default;
  }
  async run() {
    let CmdHandler = new Handlers.CommandHandler(this);
    CmdHandler.load();
    let EvtHandler = new Handlers.EventHandler(this);
    EvtHandler.load();
    this.con = await mongoose.connect(Settings.mongodb.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    this.login(this.token);
  }
}
exports.Panel = Panel;
