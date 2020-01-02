module.exports.run = async (bot, msg, args, config) => {
    require('./functions/img')('dog', msg);
}

module.exports.config = {
    name: "dog",
	description: "Gives you a dog!",
    usage: ``,
    category: `sfw`,
	accessableby: "Members",
    aliases: ['doggo']
}
