const Event = require("../Structures/Event");	
module.exports = class MessageEvent extends Event.Event {	
  constructor() {	
    super("message");	
  }	
  async exec(client, message) {	
    let settings = await client.con.models.Guild.findOne({	
      id: message.guild.id,	
    });	
    if (message.author.bot) return;	

    if (!message.content.trim().toLowerCase().startsWith(settings.prefix))	
      return;	
    const args = message.content.trim().slice(2).split(/\s+/g),	
      command = args.shift().toLowerCase(),	
      cmd =	
        client.commands.get(command) ||	
        client.commands.get(client.aliases.get(command));	
    if (!cmd) return;	
    try {	
      return cmd.exec(message, args, settings.prefix).catch((error) => {	
        message.channel.send(`${client.user.username} encountered an error.`);	
        return console.log(error);	
      });	
    } catch (e) {	
      message.channel.send(`${client.user.username} encountered an error.`);	
      return console.log(e);	
    }	
  }	
};	
