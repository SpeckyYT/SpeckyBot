module.exports = {
    name: "leave",
    description: "Does the bot leave the VC!",
    usage: "",
    category: `music`,
    aliases: ["l","stop"]
}

module.exports.run = async (bot, msg) => {
    bot.music.stop(msg);
}
