module.exports = {
    name: "lesbian",
    description: "Gives you a lesbian!",
    usage: "",
    category: `nsfw`,
    aliases: []
}

module.exports.run = async (bot, msg) => {
    require('.\\functions\\img')('lesbian', msg);
}
