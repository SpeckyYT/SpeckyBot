const { RichEmbed } = require('discord.js')

module.exports.run = async (bot, msg, args, config) => {
    let mods = [];
    let list = [];
    msg.guild.roles.forEach(role => {
        if(role.hasPermission('MANAGE_MESSAGES')){
            role.members.forEach(member => {
                if(!mods.includes(member)) mods.push(member);
            })
        }
    })
    mods.forEach(mod => {
        if(list[mod.user.presence.status]){
            list[mod.user.presence.status].push(mod.user.username);
        }else{
            list[mod.user.presence.status] = mod.user.username;
        }
    })

    let online = "<:online2:464520569975603200>"
    let away = "<:away2:464520569862357002>"
    let dnd = "<:dnd2:464520569560498197>"
    let offline = "<:offline2:464520569929334784>"

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
