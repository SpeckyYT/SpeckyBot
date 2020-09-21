module.exports = {
    name: "dog",
    description: "Gives you a dog!",
    category: "sfw",
    aliases: ['doggo']
}

const { join } = require('path');

module.exports.run = async (bot, msg) => {
    require(join(__dirname,'functions','img'))('dog', msg);
}
