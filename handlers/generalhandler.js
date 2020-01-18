const { Client } = require("discord.js");

module.exports = async () => {
    const bot = new Client({autoReconnect:true});
    require('./missingdirectories')();
    require('./missingfiles')();
    require('./login')(bot);
    require('./botloader')(bot);
    require('./website')(bot);
}
