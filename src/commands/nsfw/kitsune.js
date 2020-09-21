module.exports = {
    name: "kitsune",
    description: "Gives you a kitsune!",
    category: "nsfw",
    aliases: ["kitsu"]
}

const { join } = require('path');

module.exports.run = async (bot, msg) => {
    require(join(__dirname,'functions','img'))(["kitsune","eroKitsune"].pick(),msg);
}
