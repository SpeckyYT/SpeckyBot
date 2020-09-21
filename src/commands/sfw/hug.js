module.exports = {
    name: "hug",
    description: "Gives you a hug!",
    category: "sfw"
}

const { join } = require('path');

module.exports.run = async (bot, msg) => {
    require(join(__dirname,'functions','img'))('hug', msg);
}
