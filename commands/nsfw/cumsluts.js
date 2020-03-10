module.exports = {
    name: "cumsluts",
	description: "Gives you a cumslut!",
    usage: ``,
    category: `nsfw`,
	accessableby: "Members",
    aliases: ["cumslut","cs"]
}

module.exports.run = async (bot, msg) => {
    require('./functions/img')(["cumsluts","cumArts"].pick(),msg);
}
