module.exports.run = async (bot, msg, args, config) => {
    require('./functions/img')('pat', msg);
}

module.exports.config = {
    name: "pat",
	description: "Gives you a pat!",
    usage: ``,
    category: `sfw`,
	accessableby: "Members",
    aliases: []
}
