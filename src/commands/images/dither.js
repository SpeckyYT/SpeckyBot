module.exports = {
    name: "dither",
    description: "Dithers the image!",
    category: "images"
}

const { join } = require('path');

module.exports.run = async (bot, msg) => {
    return require(join(__dirname,'functions','methods'))(bot, msg,'dither565',false,false,"png");
}
