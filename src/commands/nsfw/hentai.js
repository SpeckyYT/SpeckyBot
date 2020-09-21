module.exports = {
    name: "hentai",
    description: "Gives you a hentai!",
    category: "nsfw"
}

const { join } = require('path');

module.exports.run = async (bot, msg) => {
    require(join(__dirname,'functions','img'))(["randomHentaiGif","hentai"],msg);
}
