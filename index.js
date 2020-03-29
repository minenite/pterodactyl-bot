const settings = require("./settings.json");
const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require('fs');
const { promisify } = require("util");
const readdir = promisify(require("fs").readdir);
client.logger = require(`./modules/logger.js`)
client.commands = new Discord.Collection();
fs.readdir("./commands/", (err, files) => {
    if (err) client.logger.log(err, "error");

    let jsfiles = files.filter(f => f.split(".").pop() === "js");
    if (jsfiles.length <= 0) {
        client.logger.log("No commands to load!", "log");
        return;
    }

    jsfiles.forEach((f, i) => {
        let props = require(`./commands/${f}`);
        client.logger.log(`${i + 1}: ${f} loaded!`, "cmd")

        client.commands.set(props.help.name, props);
    });
    client.logger.log('-------------------------------', "cmd")
    client.logger.log(`Loaded ${jsfiles.length} commands!`, "cmd")

});
const init = async () => {
    const evtFiles = await readdir("./events/");
    client.logger.log(`Loading a total of ${evtFiles.length} events.`);
    evtFiles.forEach(file => {
        const eventName = file.split(".")[0];
        const event = require(`./events/${file}`);
        client.on(eventName, event.bind(null, client));
        delete require.cache[require.resolve(`./events/${file}`)];
    });
}
init();
client.embederror = function (text) {

    const embed = new Discord.MessageEmbed()
        .setTitle("Error")
        .setDescription(text)
        .setColor(settings.embed.color.error)
        .setFooter(settings.embed.footer)
        .setTimestamp();
    return embed;
};
client.noperm = function (text) {
    const embed = new Discord.MessageEmbed()
        .setTitle(`${text} you don't have permission to use this command.`)
        .setColor(settings.embed.color.error)
        .setFooter(settings.embed.footer)
        .setTimestamp();
    return embed;
};
process.on('unhandledRejection', err => {
    client.logger.error(`Uncaught Promise Error: \n${err}`);
});
client.login(settings.token);