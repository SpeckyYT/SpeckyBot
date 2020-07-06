module.exports = {
    name: "femdom",
    description: "Gives you femdom!",
    usage: ``,
    category: `nsfw`,
    aliases: ["fem"]
}

module.exports.run = async (bot, msg) => {
    require('./functions/img')("femdom",msg);
}
