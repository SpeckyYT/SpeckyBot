module.exports = {
    name: "emotes",
    description: "Sends all emotes which the bot can access to.",
    usage: ``,
    category: `owner`,
    accessableby: "Bot Owner",
    aliases: ["emoji","emojis","emote"]
}

module.exports.run = async (bot, msg) => {
    let arr = [];
    bot.emojis.forEach(emoji => {
        arr.push(emoji);
        if(arr.join('').length > 1950){
            msg.channel.send(arr.join(''));
            arr = [];
        }
    })
    if(arr.length){
        msg.channel.send(arr.join(''));
    }
}
