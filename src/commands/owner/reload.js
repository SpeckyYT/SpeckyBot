module.exports = {
    name: "reload",
    description: "The bot will reload a specific handler!",
    usage: `<handler>`,
    category: `owner`,
    accessableby: "Bot Owner",
    aliases: ["rld","rl"]
}

module.exports.run = async (bot, msg) => {
    const { time } = bot.reload(msg.args[0]);
    return msg.channel.send(`**${args[0]}** got reloaded! (${time}ms)`);
}
