module.exports = {
    name: "yuri",
	description: "Gives you yuris!",
    usage: ``,
    category: `nsfw`,
	accessableby: "Members",
    aliases: []
}

module.exports.run = async (bot, msg) => {
    require('./functions/img')(["yuri","eroYuri"],msg);
}
