module.exports = {
    name: "trap",
    description: "Gives you a trap!",
    category: `nsfw`,
    aliases: []
}

module.exports.run = async (bot, msg) => {
    require('.\\functions\\img')("trap",msg);
}
