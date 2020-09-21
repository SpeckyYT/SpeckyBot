module.exports = {
    name: "duck",
    description: "Gives you a duck!",
    category: "sfw"
}

const { join } = require('path');

module.exports.run = async (bot, msg) => {
    require(join(__dirname,'functions','img'))('duck', msg);
}
