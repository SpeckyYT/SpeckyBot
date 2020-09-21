module.exports = {
    name: "slap",
    description: "Gives you a slap!",
    category: "sfw"
}

const { join } = require('path');

module.exports.run = async (bot, msg) => {
    require(join(__dirname,'functions','img'))('slap', msg);
}
