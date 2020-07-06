module.exports = {
    name: "encode",
    description: "Encodes a String that can be decoded in the same way!",
    usage: `<text>`,
    category: `misc`,
    aliases: ["decode","encrypt","decrypt"]
}

module.exports.run = async (bot, msg) => {
    const res = bot.encrypt(msg.content);
    if(res){
        return msg.channel.send("```\n"+res+"\n```");
    }else{
        return bot.cmdError("You have to add some valid text to encode or decode");
    }
}
