module.exports.run = async (bot, msg, args, config) => {
    require('./functions/img')('holo', msg);
}

module.exports.config = {
    name: "holo",
	description: "Gives you a holo!",
    usage: ``,
    category: `sfw`,
	accessableby: "Members",
    aliases: ['kemo']
}
