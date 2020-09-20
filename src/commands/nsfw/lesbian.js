module.exports = {
    name: "lesbian",
    description: "Gives you a lesbian!",
    category: "nsfw"
}

module.exports.run = async (bot, msg) => {
    require('.\\functions\\img')('lesbian', msg);
}
