module.exports = {
    name: "kiss",
    description: "Gives you a kiss!",
    category: "sfw"
}

const { join } = require('path');

module.exports.run = async (bot, msg) => {
    require(join(__dirname,'functions','img'))('kiss', msg);
}
