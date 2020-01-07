module.exports.run = async (bot, msg) => {
    require('./functions/methods')(bot, msg,'quality',false,[50,1,100],"jpg")
}

module.exports.config = {
    name: "jpeg",
	description: "Applies a jpeg filter to the image!",
    usage: `[Amount (1-100)]`,
    category: `images`,
	accessableby: "Members",
    aliases: ["jpg"],
    perms: [],
    cmdperms: []
}