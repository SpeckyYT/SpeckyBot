module.exports = {
    name: "gah",
    description: "Oh My Gah!",
    usage: ``,
    category: `sfw`,
    accessableby: "Members",
    aliases: ["god","mygod","ohmygod"]
}

module.exports.run = async (bot, msg) => {
    require('./functions/img')("gah",msg);
}
