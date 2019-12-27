module.exports.run = async (bot, msg, args, config) => {
    require('./functions/img')('kuni', msg);
}

module.exports.config = {
    name: "kuni",
	description: "Gives you a kuni!",
    usage: ``,
    category: `nsfw`,
	accessableby: "Members",
    aliases: []
}
