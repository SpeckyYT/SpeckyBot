module.exports = {
    name: "blur",
    description: "Blurs the image!",
    usage: `[Amount (2-100)]`,
    category: `images`,
    aliases: [],
    perms: [],
    cmdperms: []
}

module.exports.run = async (bot, msg) => {
    return require('.\\functions\\methods')(bot, msg,'blur',false,[5,2,100],"png");
}
