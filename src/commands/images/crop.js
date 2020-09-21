module.exports = {
    name: "crop",
    description: "Crops the image!",
    category: "images",
    aliases: ["autocrop"]
}

const { join } = require('path');

module.exports.run = async (bot, msg) => {
    return require(join(__dirname,'functions','methods'))(bot,msg,"autocrop",false,false,"png");
}
