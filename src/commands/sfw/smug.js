module.exports = {
    name: "smug",
    description: "Gives you a smug!",
    category: "sfw"
}

const { join } = require('path');

module.exports.run = async (bot, msg) => {
    require(join(__dirname,'functions','img'))('smug', msg);
}
