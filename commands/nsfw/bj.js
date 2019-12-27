module.exports.run = async (bot, msg, args, config) => {
    require('./functions/img')('bJ', msg);
}

module.exports.config = {
    name: "blowjob",
	description: "Gives you a blow job!",
    usage: ``,
    category: `nsfw`,
	accessableby: "Members",
    aliases: ["bj"]
}
