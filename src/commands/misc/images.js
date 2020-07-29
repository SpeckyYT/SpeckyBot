module.exports = {
    name: "image",
    description: "Searches you an image!",
    usage: "<text>",
    category: "misc",
    aliases: ['img']
}

const gis = require('g-i-s');

module.exports.run = async (bot, msg) => {
    if(!msg.cmdContent){
        return bot.cmdError("You need to give some text to search an image");
    }

    msg.channel.send("Searching for an image...")
    .then(m => {
        gis(msg.cmdContent, (err,res) => {
            if(err) return bot.cmdError(err);
            m.edit(res[Math.floor(res.length*Math.min(...Array(10).fill(Math.random())))].url);
        })
    })
}
