const { writeFile } = require("fs");
const dir = '../../../servers.json'

module.exports = async (bot, guild) => {
    const servers = require(dir);
        
    servers[guild.id] = {
        serverName: guild.name,
        serverMembers: guild.memberCount,
        lastCheck: new Date().getTime(),
    }
    servers[guild.id].ServerOwner = {
        ownerID: guild.owner.id,
        ownerName: guild.owner.user.tag
    }
    writeFile('../servers.json', JSON.stringify(servers, null, 4), err => {
        if(err) console.log(err);
    });

    let cmd = bot.commands.get('checkserver');
    cmd.run(bot)
}

module.exports.config = {
    event: "guildDelete"
}