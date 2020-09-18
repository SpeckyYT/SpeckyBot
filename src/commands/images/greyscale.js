module.exports = {
    name: "greyscale",
    description: "Applies a greyscale filter to the image!",
    category: "images",
    aliases: ["grayscale","grey","gray"]
}

module.exports.run = async (bot, msg) => {
    return require('.\\functions\\methods')(bot, msg,'greyscale',false,false,"png");
}
