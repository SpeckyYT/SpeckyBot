module.exports = {
    name: "rotate",
    description: "Rotates the image!",
    usage: `[Amount (0-360)]`,
    category: "images",
    aliases: []
}

module.exports.run = async (bot, msg) => {
    return require('.\\functions\\methods')(bot, msg,'rotate',true,[0],"png");
}
