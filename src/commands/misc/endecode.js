module.exports = {
    name: "encode",
    description: "Encodes a String that can be decoded in the same way!",
    usage: `<text>`,
    category: "misc",
    aliases: ["decode","encrypt","decrypt"]
}

module.exports.run = async (bot, msg) => {
    const res = bot.encrypt(msg.cmdContent);
    if(res){
        return msg.channel.send(String(res).code());
    }else{
        return bot.cmdError("You have to add some valid text to encode or decode");
    }
}
