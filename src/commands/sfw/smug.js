module.exports = {
    name: "smug",
    description: "Gives you a smug!",
    category: `sfw`,
    aliases: []
}

module.exports.run = async (bot, msg) => {
    require('.\\functions\\img')('smug', msg);
}
