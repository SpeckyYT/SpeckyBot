module.exports = {
    name: "food",
	description: "Feeds you!",
    usage: ``,
    category: `sfw`,
	accessableby: "Members",
    aliases: ['feed','eat']
}

module.exports.run = async (bot, msg) => {
    require('./functions/img')('feed', msg);
}
