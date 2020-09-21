module.exports = {
    name: "cumsluts",
    description: "Gives you a cumslut!",
    category: "nsfw",
    aliases: ["cumslut","cum","cumshot","cumshots","cs"]
}

const { join } = require('path');

module.exports.run = async (bot, msg) => {
    require(join(__dirname,'functions','img'))(["cumsluts","cumArts"],msg);
}
