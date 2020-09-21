module.exports = {
    name: "tickle",
    description: "Gives you a tickle!",
    category: "sfw"
}

const { join } = require('path');

module.exports.run = async (bot, msg) => {
    require(join(__dirname,'functions','img'))('tickle', msg);
}
