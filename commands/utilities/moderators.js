const { RichEmbed } = require('discord.js')

module.exports.run = async (bot, msg, args, config) => {
    let mods = [];
    let list = [];
    msg.guild.roles.forEach(role => {
        if(role.permissions.toArray().includes('MANAGE_MESSAGES')){
            role.members.forEach(member => {
                if(!mods.includes(member)) mods.push(member);
            })
        }
    })
    mods.forEach(mod => {
        list[mod.user.presence.status].push(mod.user.username)
    })

    let embed = new RichEmbed()
    .setTitle("__Mods__:")
    .setThumbnail(msg.guild.iconURL)
    .setDescription();
}

module.exports.config = {
	name: "moderators",
	description: "Gives you the active/inactive moderators list!",
    usage: ``,
    category: `utilities`,
	accessableby: "Members",
    aliases: ["moderator","mods"]
}
