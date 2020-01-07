module.exports.run = async (bot, msg) => {
    require('./functions/methods')(bot, msg,'sepia',false,[false,false,false],"png")
}

module.exports.config = {
    name: "sepia",
	description: "Applies a sepia filter to the image!",
    usage: ``,
    category: `images`,
	accessableby: "Members",
    aliases: [],
    perms: [],
    cmdperms: []
}
