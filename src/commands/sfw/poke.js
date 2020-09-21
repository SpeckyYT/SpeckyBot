module.exports = {
    name: "poke",
    description: "Gives you a poke!",
    category: "sfw"
}

const { join } = require('path');

module.exports.run = async (bot, msg) => {
    require(join(__dirname,'functions','img'))('poke', msg);
}
