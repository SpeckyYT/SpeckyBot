module.exports = {
    name: "flip",
    description: "Flips the image! (Horizontally)",
    category: "images"
}

const { join } = require('path');

module.exports.run = async (bot, msg) => {
    return require(join(__dirname,'functions','methods'))(bot, msg,'flip',false,[true, false],"png");
}
