module.exports = {
    name: "bird",
    description: "Gives you a bird!",
    category: "sfw",
    aliases: ['birb']
}

const { join } = require('path');

module.exports.run = async (bot, msg) => {
    require(join(__dirname,'functions','img'))('bird', msg);
}
