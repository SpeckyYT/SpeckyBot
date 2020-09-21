module.exports = {
    name: "keta",
    description: "Gives you a keta!",
    category: "nsfw"
}

const { join } = require('path');

module.exports.run = async (bot, msg) => {
    require(join(__dirname,'functions','img'))("keta",msg);
}
