module.exports = {
    name: "hentai",
    description: "Gives you a hentai!",
    category: "nsfw",
    aliases: []
}

module.exports.run = async (bot, msg) => {
    require('.\\functions\\img')(["randomHentaiGif","hentai"],msg);
}
