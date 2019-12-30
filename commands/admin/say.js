const { RichEmbed } = require('discord.js');
const { round, random } = require('mathjs')

module.exports.run = async (bot, msg, args, config) => {
    if(msg.content.split(/\s|\n/g).join(null).length < 7) return msg.channel.send('The message is too short.');

    let res = msg.args.join(' ');

    let channel = msg.mentions.channels.first();

    let cEmbed = new RichEmbed()
        .setTitle(msg.author.username, msg.author.avatarURL)
        .setDescription(res);

    if(res.includes('--rcaps')){
        res = res.map(l => {
            let chance = round(random());
            return l = chance ? l.toLowerCase() : l.toUpperCase();
        }).join('')
    }

    if(channel){
        channel.send(res);
    }else{
        msg.channel.send(res);
    }
    msg.delete();
}

module.exports.config = {
    name: "say",
	description: "Lets the bot say something for you!",
    usage: `<text>`,
    category: `admin`,
	accessableby: "Server Admins and Moderators",
    aliases: ["announcement"],
    perms: ['MANAGE_MESSAGES']
}
