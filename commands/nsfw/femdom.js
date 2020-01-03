module.exports.run = async (bot, msg) => {
    require('./functions/img')("femdom",msg);
}

module.exports.config = {
    name: "femdom",
	description: "Gives you a femdom!",
    usage: ``,
    category: `nsfw`,
	accessableby: "Members",
    aliases: ["fem"]
}
