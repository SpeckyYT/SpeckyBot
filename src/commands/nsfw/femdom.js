module.exports = {
    name: "femdom",
    description: "Gives you femdom!",
    usage: ``,
    category: `nsfw`,
    accessableby: "Members",
    aliases: ["fem"]
}

module.exports.run = async (bot, msg) => {
    require('./functions/img')("femdom",msg);
}
