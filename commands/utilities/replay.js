const ORP = require('osureplayparser');
var path = require('path')

module.exports.run = async (bot, msg, args, config) => {
    if(!msg.attachments) return msg.channel.send('You have to attach an Osu replay! (.osr file)');
    if(!(msg.attachments.find('filename',))) return msg.channel.send('The file has to be an Osu replay! (.osr file)')
    msg.channel.send('ok, thanks');
}

module.exports.config = {
	name: "replay",
	description: "Informations about the replay you sent!",
	usage: `[attach .osr file]`,
	category: `utilities`,
	accessableby: "Members",
    aliases: ["orp","osureplay"]
}