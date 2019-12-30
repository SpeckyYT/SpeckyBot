const { RichEmbed } = require('discord.js');
const { round, random } = require('mathjs')

module.exports.run = async (bot, msg, args, config) => {
    if(msg.content.split(/\s|\n/g).join(null).length < 7) return msg.channel.send('The message is too short.');

    let res = msg.args.join(' ');

    let channel = msg.channel;
    let user = msg.author;

    function incl(string){
        let option = "--" + string;
        if(res.includes(option)){
            res = res.replace(option,'')
            return true;
        }
        return false;
    }

    if(incl("channel")){
        let tempchannel = msg.mentions.channels.first();
        if(tempchannel){
            channel = tempchannel;
            res = res.replace(channel,'')
        }
    }

    if(incl("user")){
        let tempuser = msg.mentions.users.first();
        if(tempuser){
            user = tempuser;
            res = res.replace(user,'')
        }
    }

    if(incl("rcase")){
        res.split('').map(function(l){
            return l[Math.round(Math.random())?'toUpperCase':'toLowerCase']();
        }).join('');
    }

    if(incl("sneak")){
        msg.delete();
    }

    if(incl("emb")){
        res = new RichEmbed()
        .setDescription(res)
        .setAuthor(user.username, user.avatarURL);
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
