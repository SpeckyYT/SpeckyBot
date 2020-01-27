const { Client } = require("discord.js");

module.exports = async () => {
    const bot = new Client({
        autoReconnect : true,
        messageCacheMaxSize : 2500,
        fetchAllMembers : true
    });

    require('./dependencies')();
    require('./missingdirectories')();
    require('./missingfiles')();
    require('./botloader')(bot);
    require('./login')(bot);
    require('./website')(bot);
}
