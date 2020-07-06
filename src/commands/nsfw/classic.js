module.exports = {
    name: "sex",
    description: "Gives you a classic endpoint!",
    usage: ``,
    category: `nsfw`,
    aliases: ["classic"]
}

module.exports.run = async (bot, msg) => {
    require('./functions/img')("classic",msg);
}
