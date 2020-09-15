module.exports = {
    name: "futanari",
    description: "Gives you a futa!",
    category: `nsfw`,
    aliases: ["futa"]
}

module.exports.run = async (bot, msg) => {
    require('.\\functions\\img')("futanari",msg);
}
