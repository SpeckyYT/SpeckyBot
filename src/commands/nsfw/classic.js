module.exports = {
    name: "sex",
    description: "Gives you a classic endpoint!",
    category: "nsfw",
    aliases: ["classic"]
}

const { join } = require('path');

module.exports.run = async (bot, msg) => {
    require(join(__dirname,'functions','img'))("classic",msg);
}
