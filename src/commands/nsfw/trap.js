module.exports = {
    name: "trap",
    description: "Gives you a trap!",
    usage: "",
    category: `nsfw`,
    aliases: []
}

module.exports.run = async (bot, msg) => {
    require('.\\functions\\img')("trap",msg);
}
