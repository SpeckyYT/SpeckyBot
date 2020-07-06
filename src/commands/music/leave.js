module.exports = {
    name: "leave",
    description: "Does the bot leave the VC!",
    usage: ``,
    category: `music`,
    aliases: ["l"]
}

module.exports.run = async (bot, msg) => {
    const { args } = msg;
    bot.music.leaveFunction(msg, args.join(' '))
}
