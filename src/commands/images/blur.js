module.exports = {
    name: "blur",
    description: "Blurs the image!",
    usage: `[Amount (2-100)]`,
    category: "images"
}

const { join } = require('path');

module.exports.run = async (bot, msg) => {
    return require(join(__dirname,'functions','methods'))(bot, msg,'blur',false,[5,2,100],"png");
}
