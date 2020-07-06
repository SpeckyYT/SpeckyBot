module.exports = {
    name: "posterize",
    description: "Posterizes the image!",
    usage: `[Amount (2-500)]`,
    category: `images`,
    aliases: [],
    perms: [],
    cmdperms: []
}

module.exports.run = async (bot, msg) => {
    return require('./functions/methods')(bot, msg,'posterize',false,[5,2,500],"png");
}
