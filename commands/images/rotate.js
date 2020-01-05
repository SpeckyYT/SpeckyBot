module.exports.run = async (bot, msg) => {
    require('./functions/intensity')(bot, msg,'rotate',true,[0,0,0],"png")
}

module.exports.config = {
    name: "rotate",
	description: "Rotates the image!",
    usage: `[Amount (0-360)]`,
    category: `images`,
	accessableby: "Members",
    aliases: [],
    perms: [],
    cmdperms: []
}