module.exports.run = async (bot, msg, args, config) => {
    const time = new Date().getTime()
    console.log(time);
}

module.exports.config = {
    name: "test",
	description: "Some random command that the bot owner is testing!",
    usage: `[may vary]`,
    category: `owner`,
	accessableby: "Bot Owner",
    aliases: ["tes"]
}