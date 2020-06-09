module.exports = {
    name: "image",
    description: "Searches you an image!",
    usage: "<text>",
    category: "misc",
    accessibleby: "member",
    aliases: ['img']
}

const gis = require('g-i-s');

module.exports.run = async (bot, msg) => {
    if(!msg.content){
        return bot.cmdError("You need to give some text to search an image");
    }

    msg.channel.send("Searching for an image...")
    .then(m => {
        gis(msg.content, (err,res) => {
            if(err) return bot.cmdError(err);
            m.edit(res.pick().url);
        })
    })
}
