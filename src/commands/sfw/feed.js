module.exports = {
    name: "food",
    description: "Feeds you!",
    category: "sfw",
    aliases: ['feed','eat']
}

module.exports.run = async (bot, msg) => {
    require('.\\functions\\img')('feed', msg);
}
