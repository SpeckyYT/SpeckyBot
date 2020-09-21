module.exports = {
    name: "cat",
    description: "Gives you a cat!",
    category: "sfw"
}

const { join } = require('path');

module.exports.run = async (bot, msg) => {
    require(join(__dirname,'functions','img'))('cat', msg);
}
