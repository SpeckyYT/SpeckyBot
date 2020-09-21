module.exports = {
    name: "boobs",
    description: "Gives you boobs!",
    category: "nsfw",
    aliases: ["boob","titts","tits","tit","titt"]
}

const { join } = require('path');

module.exports.run = async (bot, msg) => {
    require(join(__dirname,'functions','img'))(["tits","boobs"],msg); // removed: smallBoobs
}
