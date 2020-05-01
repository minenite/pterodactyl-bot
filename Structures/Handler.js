const fs = require("fs");
const path = require("path");
class CommandHandler {
  constructor(client) {
    this.client = client;
  }
  async load() {
    if (!fs.statSync(path.resolve(process.cwd() + "/Commands")).isDirectory())
      throw new Error("No commands folder. Canceling command handler.");
    try {
      var files = fs
        .readdirSync(path.resolve(process.cwd() + "/Commands"))
        .filter((f) => f.endsWith(".js"));
    } catch (e) {
      throw new Error(e);
    }
    if (!files.length) throw new Error(`Warning: No commands loaded.`);
    for (const file of files) {
      const command = new (require(path.resolve(
        `${process.cwd() + "/Commands"}/${file}`
      )))(this.client);
      this.client.commands.set(command.name.toLowerCase(), command);
      for (const alias of command.aliases)
        this.client.aliases.set(alias.toLowerCase(), command);
    }
    return this;
  }
  get(cmd) {
    if (!this.client.commands.has(cmd)) return null;
    return this.client.commands.get(cmd);
  }
}
exports.CommandHandler = CommandHandler;
class EventHandler {
  constructor(client) {
    this.client = client;
  }
  async load() {
    this.events = [];
    if (!fs.statSync(path.resolve(process.cwd() + "/Events")).isDirectory())
      throw new Error("No events folder. Canceling event handler.");
    try {
      var files = fs
        .readdirSync(path.resolve(process.cwd() + "/Events"))
        .filter((f) => f.endsWith(".js"));
    } catch (e) {
      throw new Error(e);
    }
    if (!files.length) throw new Error(`Warning: No events loaded.`);
    for (const file of files) {
      const Event = require(path.resolve(
        `${process.cwd() + "/Events"}/${file}`
      ));
      const event = new Event();
      this.client.on(event.name, (...params) =>
        event.exec(this.client, ...params)
      );
      this.events.push(event.name);
    }
    return this;
  }
  get list() {
    return this.events;
  }
}
exports.EventHandler = EventHandler;
