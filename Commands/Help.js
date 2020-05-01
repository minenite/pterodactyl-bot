const Command = require("../Structures/Command");
const Discord = require("discord.js");
module.exports = class Help extends Command.Command {
  constructor(client) {
    super(client, {
      name: "help",
      description: "Get commands",
      usage: "help",
    });
  }
  async exec(message, args) {
    message.channel.send(
      new Discord.MessageEmbed()
        .setTitle(`Welcome to ${this.client.user.username}.`)
        .setDescription("A Bot to manage your Pterodactyl Panel")
        .addField(
          "Commands",
          this.client.commands
            .map((c) => `\`${c.name}\` >> ${c.description}`)
            .join("\n")
        )
    );
  }
};