module.exports = {
    name: "poke",
    description: "Gives you a poke!",
    category: "sfw",
    aliases: []
}

module.exports.run = async (bot, msg) => {
    require('.\\functions\\img')('poke', msg);
}
