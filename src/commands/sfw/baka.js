module.exports = {
    name: "baka",
    description: "Gives you a baka!",
    category: "sfw"
}

const { join } = require('path');

module.exports.run = async (bot, msg) => {
    require(join(__dirname,'functions','img'))('baka', msg);
}
