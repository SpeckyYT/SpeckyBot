module.exports = {
    name: "greyscale",
    description: "Applies a greyscale filter to the image!",
    category: "images",
    aliases: ["grayscale","grey","gray"]
}

const { join } = require('path');

module.exports.run = async (bot, msg) => {
    return require(join(__dirname,'functions','methods'))(bot, msg,'greyscale',false,false,"png");
}
