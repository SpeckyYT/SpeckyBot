module.exports = {
    name: "futanari",
    description: "Gives you a futa!",
    category: "nsfw",
    aliases: ["futa"]
}

const { join } = require('path');

module.exports.run = async (bot, msg) => {
    require(join(__dirname,'functions','img'))("futanari",msg);
}
