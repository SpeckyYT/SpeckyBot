module.exports = {
    name: "anal",
    description: "Gives you a anal porn!",
    category: "nsfw",
    aliases: ["ass"]
}

module.exports.run = async (bot, msg) => {
    require('.\\functions\\img')("anal",msg);
}
