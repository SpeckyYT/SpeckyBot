module.exports = {
    name: "pixelate",
    description: "Blurs the image!",
    usage: `[Amount (2-100)]`,
    category: "images",
    aliases: ["pixel"]
}

module.exports.run = async (bot, msg) => {
    return require('.\\functions\\methods')(bot, msg,'pixelate',false,[5,2,100],"png");
}
