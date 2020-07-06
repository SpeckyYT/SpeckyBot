module.exports = {
    name: "pixelate",
    description: "Blurs the image!",
    usage: `[Amount (2-50)]`,
    category: `images`,
    aliases: ["pixel"],
    perms: [],
    cmdperms: []
}

module.exports.run = async (bot, msg) => {
    return require('./functions/methods')(bot, msg,'pixelate',false,[5,2,50],"png");
}
