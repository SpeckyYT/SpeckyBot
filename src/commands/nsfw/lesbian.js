module.exports = {
    name: "lesbian",
    description: "Gives you a lesbian!",
    category: "nsfw"
}

const { join } = require('path');

module.exports.run = async (bot, msg) => {
    require(join(__dirname,'functions','img'))('lesbian', msg);
}
