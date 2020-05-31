module.exports = {
    name: "sepia",
    description: "Applies a sepia filter to the image!",
    usage: ``,
    category: `images`,
    accessableby: "Members",
    aliases: [],
    perms: [],
    cmdperms: []
}

module.exports.run = async (bot, msg) => {
    return require('./functions/methods')(bot, msg,'sepia',false,[false,false,false],"png");
}
