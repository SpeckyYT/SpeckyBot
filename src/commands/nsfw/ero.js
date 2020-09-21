module.exports = {
    name: "ero",
    description: "Gives you erotic images!",
    category: "nsfw",
    aliases: ["erotic"]
}

const { join } = require('path');

module.exports.run = async (bot, msg) => {
    require(join(__dirname,'functions','img'))(["holoEro","eroFeet","ero","eroKitsune","eroKemonomimi","eroNeko","eroYuri"],msg);
}
