module.exports = {
    name: "trap",
    description: "Gives you a trap!",
    category: "nsfw"
}

module.exports.run = async (bot, msg) => {
    require('.\\functions\\img')("trap",msg);
}
