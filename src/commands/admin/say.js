module.exports = {
    name: "say",
    description: "Lets the bot say something for you!",
    usage: `<text> [#channel]`,
    category: "admin",
    aliases: ["send","announcement"],
    userPerms: ['MANAGE_MESSAGES'],
    flags: ["channel","user","sneak","rcase","emb"]
}

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
        res = res.split('').map(l => l[['toUpperCase','toLowerCase'].pick()]()).join('');
    }

    if(msg.flag("emb")){
        res = bot.membed()
        .setDescription(res)
        .setAuthor(user.username, user.displayAvatarURL());
    }

    if(!res) return bot.cmdError("Message is too short.")

    channel.send(res)
}
