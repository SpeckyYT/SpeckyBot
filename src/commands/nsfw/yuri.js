module.exports = {
    name: "yuri",
    description: "Gives you yuris!",
    category: "nsfw"
}

const { join } = require('path');

module.exports.run = async (bot, msg) => {
    require(join(__dirname,'functions','img'))(["yuri","eroYuri"],msg);
}
