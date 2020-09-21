module.exports = {
    name: "pat",
    description: "Gives you a pat!",
    category: "sfw"
}

const { join } = require('path');

module.exports.run = async (bot, msg) => {
    require(join(__dirname,'functions','img'))('pat', msg);
}
