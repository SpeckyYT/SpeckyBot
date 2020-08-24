module.exports = {
    name: "flip",
    description: "Flips the image! (Horizontally)",
    usage: "",
    category: `images`,
    aliases: []
}

module.exports.run = async (bot, msg) => {
    return require('.\\functions\\methods')(bot, msg,'flip',false,[true, false],"png");
}
