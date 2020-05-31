module.exports = {
    name: "futanari",
    description: "Gives you a futa!",
    usage: ``,
    category: `nsfw`,
    accessableby: "Members",
    aliases: ["futa"]
}

module.exports.run = async (bot, msg) => {
    require('./functions/img')("futanari",msg);
}
