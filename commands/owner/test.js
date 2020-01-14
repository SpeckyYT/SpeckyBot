module.exports.run = async (bot, msg) => {
    await bot.wait(7500)
    msg.channel.send("bruh")
}

module.exports.config = {
    name: "test",
	description: "Some random command that the bot owner is testing!",
    usage: `[may vary]`,
    category: `owner`,
	accessableby: "Bot Owner",
    aliases: ["tes"]
}