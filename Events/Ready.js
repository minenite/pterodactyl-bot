const Event = require("../Structures/Event");	
module.exports = class Ready extends Event.Event {	
  constructor() {	
    super("ready");	
  }	
  async exec(client) {	
    console.log(`Ready with ${client.guilds.cache.size} guilds.`);	
  }	
};	
