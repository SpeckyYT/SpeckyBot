module.exports = {
    name: "bunny",
    description: "Gives you a bunny!",
    category: "sfw",
    aliases: ['rabbit']
}

const { join } = require('path');

module.exports.run = async (bot, msg) => {
    require(join(__dirname,'functions','img'))('bunny', msg);
}
