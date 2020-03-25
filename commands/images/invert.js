module.exports = {
    name: "invert",
	description: "Invert the color of the image!",
    usage: ``,
    category: `images`,
	accessableby: "Members",
    aliases: [],
    perms: [],
    cmdperms: []
}

module.exports.run = async (bot, msg) => {
    require('./functions/methods')(bot, msg,'invert',false,false,"png")
}
