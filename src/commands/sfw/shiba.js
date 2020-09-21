module.exports = {
    name: "shiba",
    description: "Gives you a shiba!",
    category: "sfw",
    aliases: ['shibe']
}

const { join } = require('path');

module.exports.run = async (bot, msg) => {
    require(join(__dirname,'functions','img'))('shiba', msg);
}
