module.exports.run = async (bot, msg) => {
    require('./functions/intensity')(bot, msg,'pixelate',false,[5,2,50],"png")
}

module.exports.config = {
    name: "pixelate",
	description: "Blurs the image!",
    usage: `[Amount (2-50)]`,
    category: `images`,
	accessableby: "Members",
    aliases: ["pixel"],
    perms: [],
    cmdperms: []
}
