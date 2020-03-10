module.exports = {
    name: "say",
	description: "Lets the bot say something for you!",
    usage: `<text> [#channel] [--emb/--sneak]`,
    category: `admin`,
	accessableby: "Server Admins and Moderators",
    aliases: ["send","announcement"],
    perms: ['MANAGE_MESSAGES']
}

const { RichEmbed } = require('discord.js');
const { randomInt } = require('mathjs')

module.exports.run = async (bot, msg) => {
    let res = msg.content;

    let channel = msg.channel;
    let user = msg.author;

    if(msg.flag("channel")){
        let tempchannel = msg.mentions.channels.first();
        if(tempchannel){
            channel = tempchannel;
            res = res.replace(channel,'')
        }
    }

    if(msg.flag("user")){
        let tempuser = msg.mentions.users.first();
        if(tempuser){
            user = tempuser;
            res = res.replace(user,'')
        }
    }

    if(msg.flag("sneak")){
        msg.delete();
    }

    if(msg.flag("rcase")){
        res = res.split('').map(function(l){
            return l[randomInt(0,2)?'toUpperCase':'toLowerCase']();
        }).join('');
    }

    if(msg.flag("emb")){
        res = new RichEmbed()
        .setDescription(res)
        .setAuthor(user.username, user.avatarURL);
    }

    if(!res) return msg.channel.send("Message is too short.")

    channel.send(res)
}
