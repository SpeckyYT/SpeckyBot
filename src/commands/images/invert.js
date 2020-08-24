module.exports = {
    name: "invert",
    description: "Invert the color of the image!",
    usage: "",
    category: `images`,
    aliases: []
}

module.exports.run = async (bot, msg) => {
    return require('.\\functions\\methods')(bot, msg,'invert',false,false,"png");
}
