module.exports = {
    name: "flop",
    description: "Flips the image! (Vertically)",
    category: "images"
}

module.exports.run = async (bot, msg) => {
    return require('.\\functions\\methods')(bot, msg,'flip',false,[false, true],"png");
}
