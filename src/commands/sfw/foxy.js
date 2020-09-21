module.exports = {
    name: "foxgirl",
    description: "Gives you a fox girl!",
    category: "sfw",
    aliases: ['fox','foxy']
}

const { join } = require('path');

module.exports.run = async (bot, msg) => {
    require(join(__dirname,'functions','img'))('foxGirl', msg);
}
