module.exports = {
    name: "anal",
    description: "Gives you a anal porn!",
    category: "nsfw",
    aliases: ["ass"]
}

const { join } = require('path');

module.exports.run = async (bot, msg) => {
    require(join(__dirname,'functions','img'))("anal",msg);
}
