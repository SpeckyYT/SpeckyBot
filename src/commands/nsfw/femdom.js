module.exports = {
    name: "femdom",
    description: "Gives you femdom!",
    category: `nsfw`,
    aliases: ["fem"]
}

module.exports.run = async (bot, msg) => {
    require('.\\functions\\img')("femdom",msg);
}
