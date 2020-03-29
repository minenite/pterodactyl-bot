const settings = require('../settings.json');
module.exports = (client, message) => {
    if (message.author.bot) return;
    const prefix = settings.prefix;
    let messageArray = message.content.split(/\s+/g);
    let command = messageArray[0];
    let args = messageArray.slice(1);
    if (!command.startsWith(prefix)) return;
    let cmd = client.commands.get(command.slice(prefix.length));
    if (cmd) cmd.run(client, message, args)
};