module.exports = {
    name: "dither",
	description: "Dithers the image!",
    usage: ``,
    category: `images`,
	accessableby: "Members",
    aliases: [],
    perms: [],
    cmdperms: []
}

module.exports.run = async (bot, msg) => {
    require('./functions/methods')(bot, msg,'dither565',false,false,"png")
}
