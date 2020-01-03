module.exports.run = async (bot, msg) => {
    require('./functions/img')('feed', msg);
}

module.exports.config = {
    name: "feed",
	description: "Feeds you!",
    usage: ``,
    category: `sfw`,
	accessableby: "Members",
    aliases: ['eat']
}
