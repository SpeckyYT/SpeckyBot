module.exports = {
    name: "kuni",
    description: "Gives you a kuni!",
    category: "nsfw"
}

const { join } = require('path');

module.exports.run = async (bot, msg) => {
    require(join(__dirname,'functions','img'))('kuni', msg);
}
