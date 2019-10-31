const Discord = require("discord.js");
const fetch = require('node-fetch');

module.exports.run = async (bot, msg, args, owner, prefix) => {
    var link;
    if(!args[0]) return msg.channel.send("You have to define a Server IP");
    if(!args[1]){
        link = `https://mcapi.us/server/status?ip=${args[0]}`;
    }else{
        link = `https://mcapi.us/server/status?ip=${args[0]}&port=${args[1]}`;
    }
    const response = fetch(link)
    .then(res => res.json())
    .then(json => {
        try{
        const {status, online, motd, error, players, server} = json;
        let cEmbed = new Discord.RichEmbed()
        .setColor('#00FF00')
        .addField(`Fetch Status:`, status)
        .addField(`Online Status:`, online)
        .addField(`Description:`, `"${motd}"`)
        .addField(`Errors:`, `${error || "No Errors"}`)
        .addField(`Active Players:`, players.now)
        .addField(`Maximal Players:`, players.max)
        .addField(`Server Version:`, server.name)
        .addField(`⠀`, "The following image could be not updated")
        .setImage(`https://mcapi.us/server/image?ip=${args[0]}&theme=dark`)
        .setTimestamp()
        .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL);

        msg.channel.send(cEmbed);
        }catch(e){
            msg.channel.send("An error occurred (server doesn't exist or wrong port)")
        }
    });
}

module.exports.config = {
    name: "minecraft",
	description: "Gives some informations of a Minecraft Server!",
    usage: `<Server IP> [Server Port]`,
    category: `misc`,
	accessableby: "Members",
    aliases: ["minecraftserver","mcs","ms","mineserver"]
}