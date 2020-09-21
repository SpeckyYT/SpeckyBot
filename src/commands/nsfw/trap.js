module.exports = {
    name: "trap",
    description: "Gives you a trap!",
    category: "nsfw"
}

const { join } = require('path');

module.exports.run = async (bot, msg) => {
    require(join(__dirname,'functions','img'))("trap",msg);
}
