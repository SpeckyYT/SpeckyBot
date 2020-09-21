module.exports = {
    name: "solo",
    description: "Gives you a solo girl!",
    category: "nsfw",
    aliases: ["sologirl","alone"]
}

const { join } = require('path');

module.exports.run = async (bot, msg) => {
    require(join(__dirname,'functions','img'))(["girlSolo","girlSoloGif"],msg);
}
