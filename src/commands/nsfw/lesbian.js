module.exports = {
    name: "lesbian",
    description: "Gives you a lesbian!",
    category: "nsfw",
    aliases: []
}

module.exports.run = async (bot, msg) => {
    require('.\\functions\\img')('lesbian', msg);
}
