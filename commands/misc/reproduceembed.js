const { RichEmbed } = require('discord.js')

module.exports.run = async (bot, msg, args, owner, prefix) => {
    var mess;
    
    if(!msg.mentions.channels) return msg.channel.send('You have to tag a channel!')

    args.forEach(arg => {
        if(!isNaN(arg)){
            if(msg.mentions.channels.first().fetchMessage(arg)) mess = msg.mentions.channels.first().fetchMessage(arg);
        }
    })

    if(mess.embeds) return;
    mess.embeds.forEach(emb => {
        msg.channel.send(new RichEmbed(emb))
    })
}

module.exports.config = {
    name: "reproduceembed",
	description: "Reproduces an existing embed",
    usage: `#[Channel] [MessageID]`,
    category: `misc`,
	accessableby: "Members",
    aliases: ["remb","repemb"]
}