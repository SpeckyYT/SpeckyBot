module.exports = {
    name: "pussy",
    description: "Gives you a pussy!",
    category: "nsfw"
}

module.exports.run = async (bot, msg) => {
    require('.\\functions\\img')(["pussy","pussyWankGif","pussyArt"],msg);
}
