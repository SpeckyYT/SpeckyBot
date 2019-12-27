module.exports.run = async (bot, msg, args, config) => {
    require('./functions/img')('foxGirl', msg);
}

module.exports.config = {
    name: "foxgirl",
	description: "Gives you a fox girl!",
    usage: ``,
    category: `sfw`,
	accessableby: "Members",
    aliases: ['fox','foxy']
}
