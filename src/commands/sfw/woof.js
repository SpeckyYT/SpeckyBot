module.exports = {
    name: "woof",
    description: "Gives you a dog!",
    category: "sfw",
    aliases: ["dog"]
}

const { join } = require('path');

module.exports.run = async (bot, msg) => {
    require(join(__dirname,'functions','img'))('woof', msg);
}
