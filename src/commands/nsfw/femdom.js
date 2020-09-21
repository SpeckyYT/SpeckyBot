module.exports = {
    name: "femdom",
    description: "Gives you femdom!",
    category: "nsfw",
    aliases: ["fem"]
}

const { join } = require('path');

module.exports.run = async (bot, msg) => {
    require(join(__dirname,'functions','img'))("femdom",msg);
}
