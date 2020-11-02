module.exports = {
    name: "say",
    description: "Lets the bot say something for you!",
    usage: `<text> [#channel]`,
    category: "admin",
    aliases: ["send","announcement"],
    userPerms: ['MANAGE_MESSAGES'],
    flags: ["channel","user","sneak","rcase","emb"]
}

const { MessageEmbed } = require('discord.js');

module.exports.run = async (bot, msg) => {
    let res = msg.cmdContent;

    let channel = msg.channel;
    let user = msg.author;

    if(msg.flag("channel")){
        const tempchannel = msg.mentions.channels.first();
        if(tempchannel){
            channel = tempchannel;
            res = res.replace(channel,'')
        }
    }

    if(msg.flag("user")){
        const tempuser = msg.mentions.users.first();
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
            return l(['toUpperCase','toLowerCase'].pick())();
        }).join('');
    }

    if(msg.flag("emb")){
        res = new MessageEmbed()
        .setDescription(res)
        .setAuthor(user.username, user.avatarURL());
    }

    if(!res) return bot.cmdError("Message is too short.")

    channel.send(res)
}
