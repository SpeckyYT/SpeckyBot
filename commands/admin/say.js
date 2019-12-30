const { RichEmbed } = require('discord.js');
const { round, random } = require('mathjs')

module.exports.run = async (bot, msg, args, config) => {
    if(msg.content.split(/\s|\n/g).join(null).length < 7) return msg.channel.send('The message is too short.');

    let res = msg.args.join(' ');

    let channel = msg.mentions.channels.first();

    function incl(string){
        let option = "--" + string;
        if(res.includes(option)){
            res = res.replace(option,'')
            return true;
        }
        return false;
    }

    if(channel){
        res = res.replace(channel,'')
    }else{
        channel = msg.channel;
    }

    if(incl("rcase")){
        res = res.split('').forEach(l => {
            let chance = round(random());
            return l = chance ? l.toLowerCase() : l.toUpperCase();
        }).join('')
    }

    if(incl("sneak")){
        msg.delete();
    }

    if(incl("emb")){
        res = new RichEmbed()
        .setTitle(msg.author.username)
        .setThumbnail(msg.author.avatarURL)
        .setDescription(res);
    }

    channel.send(res)
}

module.exports.config = {
    name: "say",
	description: "Lets the bot say something for you!",
    usage: `<text> [#channel] [--emb/--sneak]`,
    category: `admin`,
	accessableby: "Server Admins and Moderators",
    aliases: ["announcement"],
    perms: ['MANAGE_MESSAGES']
}
