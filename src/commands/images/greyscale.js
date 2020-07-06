module.exports = {
    name: "greyscale",
    description: "Applies a greyscale filter to the image!",
    usage: ``,
    category: `images`,
    aliases: ["grayscale","grey","gray"],
    perms: [],
    cmdperms: []
}

module.exports.run = async (bot, msg) => {
    return require('./functions/methods')(bot, msg,'greyscale',false,[false,false,false],"png");
}
