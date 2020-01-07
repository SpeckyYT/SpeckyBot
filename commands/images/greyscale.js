module.exports.run = async (bot, msg) => {
    require('./functions/methods')(bot, msg,'greyscale',false,[false,false,false],"png")
}

module.exports.config = {
    name: "greyscale",
	description: "Applies a greyscale filter to the image!",
    usage: ``,
    category: `images`,
	accessableby: "Members",
    aliases: ["grayscale","grey","gray"],
    perms: [],
    cmdperms: []
}
