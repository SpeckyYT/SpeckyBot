module.exports = {
    name: "pussy",
    description: "Gives you a pussy!",
    category: "nsfw"
}

const { join } = require('path');

module.exports.run = async (bot, msg) => {
    require(join(__dirname,'functions','img'))(["pussy","pussyWankGif","pussyArt"],msg);
}
