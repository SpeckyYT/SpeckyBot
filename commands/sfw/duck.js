module.exports.run = async (bot, msg, args, config) => {
    require('./functions/img')('duck', msg);
}

module.exports.config = {
    name: "duck",
	description: "Gives you a duck!",
    usage: ``,
    category: `sfw`,
	accessableby: "Members",
    aliases: []
}
