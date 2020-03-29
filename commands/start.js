const Discord = require("discord.js")
const settings = require("../settings.json")
const node = require('nodeactyl')
const Client = node.Client;
const sql = require("sqlite")
sql.open("./users.sqlite")
module.exports.run = (client, message, args) => {
    sql.get(`SELECT * FROM users WHERE id = "${message.author.id}"`).then(row => {
        if (!row) {
            const user = message.author.username
            message.channel.send(client.noperm(user))
        } else {
            Client.login(settings.panelURL, row.token, (logged_in) => {

            });
            Client.startServer(args[0]).then((response) => {
                const embed = new Discord.MessageEmbed()
                    .setTitle(response)
                    .setColor(settings.embed.color.default)
                    .setFooter(settings.embed.footer);
                message.channel.send(embed);
            }).catch((error) => {
                message.channel.send(client.embederror(error))
            });
        }

    })
}
module.exports.help = {
    name: "start"
}

