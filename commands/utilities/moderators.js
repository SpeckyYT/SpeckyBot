const { RichEmbed } = require('discord.js')

module.exports.run = async (bot, msg, args, config) => {
    let mods = [];
    let list = [];
    msg.guild.roles.forEach(role => {
        if(role.hasPermission('MANAGE_MESSAGES')){
            role.members.forEach(member => {
                if(!mods.includes(member) && !member.user.bot) mods.push(member);
            })
        }
    })
    mods.forEach(mod => {
        if(list[mod.user.presence.status]){
            list[mod.user.presence.status].push([mod.user.username]);
        }else{
            list[mod.user.presence.status] = [mod.user.username];
        }
    })

    let online = "<:online:661611929332219905>"
    let away = "<:idle:661611969131970580>"
    let dnd = "<:dnd:661612025943818265>"
    let offline = "<:offline:661612200527396865>"

    let embed = new RichEmbed()
    .setTitle("__Mods__:")
    .setThumbnail(msg.guild.iconURL)
    .setDescription(`${online} ${list.online.join(", ")}\n${away} ${list.idle.join(", ")}\n${dnd} ${list.dnd.join(", ")}\n${offline} ${list.offline.join(", ")}`);

    msg.channel.send(embed);
}

module.exports.config = {
	name: "moderators",
	description: "Gives you the active/inactive moderators list!",
    usage: ``,
    category: `utilities`,
	accessableby: "Members",
    aliases: ["moderator","mods"]
}
