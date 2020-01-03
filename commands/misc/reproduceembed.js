const { RichEmbed } = require('discord.js')

module.exports.run = async (bot, msg) => {
    let { args } = msg;
    if(msg.mentions.channels > 0){
        var chan = msg.mentions.channels.first()
    }else{
        var chan = msg.channel
    }

    args.forEach(async arg => {
        chan.fetchMessage(arg).then(msg => {
            if(msg){
                msg.embeds.forEach(emb => {msg.channel.send(new RichEmbed(emb))})
            }
        })
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