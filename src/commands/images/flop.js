module.exports = {
    name: "flop",
    description: "Flips the image! (Vertically)",
    category: "images"
}

const { join } = require('path');

module.exports.run = async (bot, msg) => {
    return require(join(__dirname,'functions','methods'))(bot, msg,'flip',false,[false, true],"png");
}
