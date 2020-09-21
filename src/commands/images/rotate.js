module.exports = {
    name: "rotate",
    description: "Rotates the image!",
    usage: `[Amount (0-360)]`,
    category: "images"
}

const { join } = require('path');

module.exports.run = async (bot, msg) => {
    return require(join(__dirname,'functions','methods'))(bot, msg,'rotate',true,[0],"png");
}
