const Command = require("../Structures/Command");
const Discord = require("discord.js");
module.exports = class Link extends Command.Command {
  constructor(client) {
    super(client, {
      name: "link",
      description: "Links you to the panel",
      usage: "staff",
    });
  }
  async exec(message, args) {
    let settings = await this.client.con.models.Guild.findOne({
        id: message.guild.id,
      });
      
      let description = settings.staff.filter(x => message.guild.members.includes(x)).map(x => message.guild.members.cache.get(x).username).join(", ");
    message.channel.send(
      new Discord.MessageEmbed()
        .setTitle(`${message.guild.name}'s Staff Team`)
        .setDescription(description)
    );
  }
};
