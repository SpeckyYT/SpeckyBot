module.exports = {
    name: "jpeg",
    description: "Applies a jpeg filter to the image!",
    usage: `[Amount (1-100)]`,
    category: "images",
    aliases: ["jpg"]
}

const { join } = require('path');

module.exports.run = async (bot, msg) => {
    return require(join(__dirname,'functions','methods'))(bot, msg,'quality',false,[20,1,100],msg.command);
}
