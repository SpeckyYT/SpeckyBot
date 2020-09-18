module.exports = {
    name: "reproduceembed",
    description: "Reproduces an existing embed",
    usage: `#[Channel] [MessageID]`,
    category: "misc",
    aliases: ["remb","repemb"]
}

const { RichEmbed } = require('discord.js')

module.exports.run = async (bot, msg) => {
    const { args } = msg;

    let chan;

    if(msg.mentions.channels > 0){
        chan = msg.mentions.channels.first();
    }else{
        chan = msg.channel;
    }

    args.forEach(async arg => {
        chan.fetchMessage(arg).then(msg => {
            if(msg){
                msg.embeds.forEach(emb => {
                    msg.channel.send(new RichEmbed(emb))
                })
            }
        })
    })
}
