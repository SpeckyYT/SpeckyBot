module.exports = {
    name: "yuri",
    description: "Gives you yuris!",
    category: "nsfw"
}

module.exports.run = async (bot, msg) => {
    require('.\\functions\\img')(["yuri","eroYuri"],msg);
}
