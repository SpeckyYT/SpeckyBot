module.exports = {
    name: "fox",
    description: "Gives you a fox!",
    category: "sfw"
}

const { join } = require('path');

module.exports.run = async (bot, msg) => {
    require(join(__dirname,'functions','img'))('fox', msg);
}
