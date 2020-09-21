module.exports = {
    name: "blowjob",
    description: "Gives you a blow job!",
    category: "nsfw",
    aliases: ["bj"]
}

const { join } = require('path');

module.exports.run = async (bot, msg) => {
    require(join(__dirname,'functions','img'))(["bJ","blowJob"],msg);
}
