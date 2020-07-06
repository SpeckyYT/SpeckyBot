module.exports = {
    name: "dither",
    description: "Dithers the image!",
    usage: ``,
    category: `images`,
    aliases: [],
    perms: [],
    cmdperms: []
}

module.exports.run = async (bot, msg) => {
    return require('./functions/methods')(bot, msg,'dither565',false,false,"png");
}
