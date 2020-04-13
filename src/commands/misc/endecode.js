module.exports = {
    name: "encode",
    description: "Encodes a String that can be decoded in the same way!",
    usage: `<text>`,
    category: `misc`,
    accessableby: "Members",
    aliases: ["decode","encrypt","decrypt"]
}

module.exports.run = async (bot, msg) => {
    if(msg.content){
        msg.channel.send(bot.encrypt(msg.content));
    }else{
        return bot.cmdError("You have to add some text to encode or decode");
    }
}
