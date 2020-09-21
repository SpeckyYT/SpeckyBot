module.exports = {
    name: "posterize",
    description: "Posterizes the image!",
    usage: `[Amount (2-500)]`,
    category: "images"
}

const { join } = require('path');

module.exports.run = async (bot, msg) => {
    return require(join(__dirname,'functions','methods'))(bot, msg,'posterize',false,[5,2,500],"png");
}
