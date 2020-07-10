module.exports = {
    event: "message"
}

const { RichEmbed } = require('discord.js')

// channel limiter
const limited = ["643548931007184906"]

module.exports.call = async (bot, msg) => {
    // channel limiter
    if(!limited.includes(msg.channel.id)) return;

    if(msg.author.id == bot.user.id) return;

    const regex = /\b\d{7,10}\b/g

    if(msg.content.match(regex)){
        if(msg.content.length > 200){
            msg.channel.send(error("You exceed the massage length of 200 letters."))
            .then(ms => {
                try{
                    ms.delete(15000)
                }catch{}
            })
            try{
                msg.delete(15000)
            }catch{}
        }else{
            return;
        }
    }else{
        msg.channel.send(error("Your message doesn't include an ID (be sure to separate the ID by spaces)."))
        .then(ms => {
            try{
                ms.delete(15000)
            }catch{}
        })
        try{
            msg.delete(15000)
        }catch{}
    }
}

function error(text){
    return new RichEmbed()
    .setTitle('ERROR!')
    .setColor('FF0000')
    .setDescription(text + "\nYour message will be deleted in 15 seconds.")
}
