module.exports = {
    name: "food",
    description: "Feeds you!",
    usage: "",
    category: `sfw`,
    aliases: ['feed','eat']
}

module.exports.run = async (bot, msg) => {
    require('.\\functions\\img')('feed', msg);
}
