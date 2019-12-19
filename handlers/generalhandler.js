const { Client } = require("discord.js");

module.exports = () => {
    const bot = new Client({autoReconnect:true});
    require('./missingdirectories')();
    require('./missingfiles')();
    require('./botloader')(bot);
    require('./login')(bot);
}
