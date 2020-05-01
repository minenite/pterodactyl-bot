const Command = require("../Structures/Command");
const Discord = require("discord.js");
module.exports = class Staff extends Command.Command {
  constructor(client) {
    super(client, {
      name: "staff",
      description: "Get a list of members in the staff team",
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
