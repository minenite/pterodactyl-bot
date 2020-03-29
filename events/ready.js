const sql = require('sqlite')
sql.open('./users.sqlite')
const settings = require('../settings.json');
module.exports = async (client) => {
    client.logger.log("to serve you!", "ready");
    client.user.setPresence({ activity: { name: `with ${settings.panelURL}` }, status: 'online' })
    sql.run(`CREATE TABLE IF NOT EXISTS users (id INTEGER, token TEXT)`);
};