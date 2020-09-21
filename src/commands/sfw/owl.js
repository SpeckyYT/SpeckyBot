module.exports = {
    name: "owl",
    description: "Gives you a owl!",
    category: "sfw"
}

const { join } = require('path');

module.exports.run = async (bot, msg) => {
    require(join(__dirname,'functions','img'))('owl', msg);
}
