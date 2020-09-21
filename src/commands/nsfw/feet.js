module.exports = {
    name: "feet",
    description: "Gives you feets!",
    category: "nsfw",
    aliases: ["foot"]
}

const { join } = require('path');

module.exports.run = async (bot, msg) => {
    require(join(__dirname,'functions','img'))(["feetGif","eroFeet","feet"],msg);
}
