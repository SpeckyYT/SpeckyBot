module.exports = {
    name: "lizard",
    description: "Gives you a lizard!",
    category: "sfw"
}

const { join } = require('path');

module.exports.run = async (bot, msg) => {
    require(join(__dirname,'functions','img'))('lizard', msg);
}
