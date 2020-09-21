module.exports = {
    name: "cuddle",
    description: "Cuddles you!",
    category: "sfw"
}

const { join } = require('path');

module.exports.run = async (bot, msg) => {
    require(join(__dirname,'functions','img'))('cuddle', msg);
}
