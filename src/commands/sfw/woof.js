module.exports = {
    name: "woof",
	description: "Gives you a dog!",
    usage: ``,
    category: `sfw`,
	accessableby: "Members",
    aliases: []
}

module.exports.run = async (bot, msg) => {
    require('./functions/img')('woof', msg);
}
