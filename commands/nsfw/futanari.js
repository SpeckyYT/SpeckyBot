module.exports.run = async (bot, msg, args, config) => {
    require('./functions/img')("futanari",msg);
}

module.exports.config = {
    name: "futanari",
	description: "Gives you a femdom!",
    usage: ``,
    category: `nsfw`,
	accessableby: "Members",
    aliases: ["futa"]
}
