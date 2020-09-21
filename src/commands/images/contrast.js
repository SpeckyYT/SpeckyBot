module.exports = {
    name: "contrast",
    description: "Applies a contrast to the image!",
    usage: `[Amount (-100 - 100)]`,
    category: "images",
    aliases: ["real"]
}

const { join } = require('path');

module.exports.run = async (bot, msg) => {
    if(msg.Args) msg.Args[0] = Number(msg.Args[0]) / 100;
    return require(join(__dirname,'functions','methods'))(bot, msg,'contrast',false,[0.5,-1,1],"png");
}
