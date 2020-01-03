module.exports.run = async (bot, msg) => {
    require('./functions/img')('cuddle', msg);
}

module.exports.config = {
    name: "cuddle",
	description: "Cuddles you!",
    usage: ``,
    category: `sfw`,
	accessableby: "Members",
    aliases: []
}
