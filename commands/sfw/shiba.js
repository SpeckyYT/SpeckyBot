module.exports.run = async (bot, msg, args, config) => {
    require('./functions/img')('shiba', msg);
}

module.exports.config = {
    name: "shiba",
	description: "Gives you a shiba!",
    usage: ``,
    category: `sfw`,
	accessableby: "Members",
    aliases: ['shibe']
}
