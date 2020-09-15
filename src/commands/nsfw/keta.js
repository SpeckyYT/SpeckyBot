module.exports = {
    name: "keta",
    description: "Gives you a keta!",
    category: `nsfw`,
    aliases: []
}

module.exports.run = async (bot, msg) => {
    require('.\\functions\\img')("keta",msg);
}
