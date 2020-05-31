module.exports = {
    name: "rotate",
    description: "Rotates the image!",
    usage: `[Amount (0-360)]`,
    category: `images`,
    accessableby: "Members",
    aliases: [],
    perms: [],
    cmdperms: []
}

module.exports.run = async (bot, msg) => {
    return require('./functions/methods')(bot, msg,'rotate',true,[0,0,0],"png");
}
