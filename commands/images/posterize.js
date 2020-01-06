module.exports.run = async (bot, msg) => {
    require('./functions/intensity')(bot, msg,'posterize',false,[5,2,50],"png")
}

module.exports.config = {
    name: "posterize",
	description: "Posterizes the image!",
    usage: `[Amount (2-50)]`,
    category: `images`,
	accessableby: "Members",
    aliases: [],
    perms: [],
    cmdperms: []
}
