module.exports = {
    name: "hwjs",
	description: "Hello World!",
    usage: ``,
    category: `helloworld`,
	accessableby: "Members",
    aliases: []
}

module.exports.run = async (bot, msg) => {
    msg.channel.send("`JavaScript`: Hello World!");
}