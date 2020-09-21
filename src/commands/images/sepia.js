module.exports = {
    name: "sepia",
    description: "Applies a sepia filter to the image!",
    category: "images"
}

const { join } = require('path');

module.exports.run = async (bot, msg) => {
    return require(join(__dirname,'functions','methods'))(bot, msg,'sepia',false,false,"png");
}
