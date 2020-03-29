const Discord = require("discord.js")
const settings = require("../settings.json")

module.exports.run = (client, message, args) => {
  const p = settings.prefix
  const embed = new Discord.MessageEmbed()
    .setTitle(`:mailbox_with_mail: Help`)
    .setColor(settings.embed.color.default)
    .setDescription(`**Commands:**\n${p}kill\n${p}register\n${p}reset\n${p}restart\n${p}serverinfo\n${p}servers\n${p}start\n${p}status\n${p}stop`)
    .setFooter(settings.embed.footer);
  message.channel.send(embed);
}
module.exports.help = {
  name: "help"
}

