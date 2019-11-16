const { writeFile } = require("fs");
const dir = '../../../servers.json'

module.exports.run = async (bot, msg, args, config) => {
    bot.guilds.forEach(guild => {
        var servers = require(dir);
        
        servers[guild.id] = {
            serverName: guild.name,
            serverMembers: guild.memberCount,
            lastCheck: new Date().getTime(),
        }
        servers[guild.id].ServerOwner = {
            ownerID: guild.owner.id,
            ownerName: guild.owner.user.tag,
        }

        servers.sort()

        writeFile('../servers.json', JSON.stringify(servers, null, 4), err => {
            if(err) console.log(err);
        });
    });
    console.log('servers.json got updated!')
}

module.exports.config = {
    name: "checkserver",
	description: "Saves every server in a JSON file!",
    usage: ``,
    category: `owner`,
	accessableby: "Bot Owner",
    aliases: ["checkservers"]
}