module.exports = {
    name: "feed",
	description: "Feeds you!",
    usage: ``,
    category: `sfw`,
	accessableby: "Members",
    aliases: ['eat']
}

module.exports.run = async (bot, msg) => {
    require('./functions/img')('feed', msg);
}
