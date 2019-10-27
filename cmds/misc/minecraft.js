const Discord = require("discord.js");
const fetch = require('node-fetch');

module.exports.run = async (bot, msg, args, owner, prefix) => {
    var link = `https://mcapi.us/server/status?ip=${args[0]}`;
    const response = fetch(link)
    .then(res => res.json())
    .then(json => {
        const {status, online, motd, error, players, server} = json;

        let cEmbed = new Discord.RichEmbed()
        .setColor('#00FF00')
        .addField(`Fetch Status:`, status)
        .addField(`Online Status:`, online)
        .addField(`Description:`, motd)
        .addField(`Errors:`, `${error || "No Errors"}`)
        .addField(`Active Players:`, players.now)
        .addField(`Maximal Players:`, players.max)
        .addField(`Server Version:`, server.name)
        .addField(`⠀`, "The following image could be not updated")
        .setImage(`https://mcapi.us/server/image?ip=${args[0]}&theme=dark`)
        .setTimestamp()
        .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL);

        msg.channel.send(cEmbed);
    });
}

module.exports.config = {
    name: "minecraft",
	description: "Gives you one of the difficulty icons of Geometry Dash!",
    usage: `<server IP (no static IP)>`,
    category: `misc`,
	accessableby: "Members",
    aliases: ["minecraftserver","mcs","ms","mineserver"]
}