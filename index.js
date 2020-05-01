const Client = require("./Structures/Client");
const { token } = require("./settings.json");
let client = new Client.Assistant(token, { disableEveryone: true });
client.run();
