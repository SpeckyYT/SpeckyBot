module.exports.run = async (bot, msg, args, config) => {
    require('./functions/img')('meow', msg);
}

module.exports.config = {
    name: "meow",
	description: "Gives you a cat!",
    usage: ``,
    category: `sfw`,
	accessableby: "Members",
    aliases: []
}
