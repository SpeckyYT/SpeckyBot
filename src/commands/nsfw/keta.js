module.exports = {
    name: "keta",
    description: "Gives you a keta!",
    usage: ``,
    category: `nsfw`,
    accessableby: "Members",
    aliases: []
}

module.exports.run = async (bot, msg) => {
    require('./functions/img')("keta",msg);
}
