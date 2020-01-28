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
    let res = msg.Args.join(' ');

    let channel = msg.channel;
    let user = msg.author;

    function incl(string){
        let option = "--" + string;
        if(res.toLowerCase().includes(option)){
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

    if(incl("sneak")){
        msg.delete();
    }

    if(incl("rcase")){
        res = res.split('').map(function(l){
            return l[randomInt(0,2)?'toUpperCase':'toLowerCase']();
        }).join('');
    }

    if(incl("emb")){
        res = new RichEmbed()
        .setDescription(res)
        .setAuthor(user.username, user.avatarURL);
    }
    if(!res) return msg.channel.send("Message is too short.")
    channel.send(res)
}
