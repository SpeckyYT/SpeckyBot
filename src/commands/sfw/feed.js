module.exports = {
    name: "food",
    description: "Feeds you!",
    category: "sfw",
    aliases: ['feed','eat']
}

const { join } = require('path');

module.exports.run = async (bot, msg) => {
    require(join(__dirname,'functions','img'))('feed', msg);
}
