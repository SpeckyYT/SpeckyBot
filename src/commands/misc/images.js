module.exports = {
    name: "image",
    description: "Searches you an image!",
    usage: "<text>",
    category: "misc",
    accessibleby: "member",
    aliases: ['img']
}

module.exports.run = async (bot, msg) => {
    if(!msg.content){
        return bot.cmdError("You need to give some text to search an image");
    }

    require('g-i-s')(msg.content, (err,res) => {
        if(err) return bot.cmdError(err);
        msg.channel.send(res.pick().url);
    })
}
