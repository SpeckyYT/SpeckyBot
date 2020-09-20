module.exports = {
    name: "poke",
    description: "Gives you a poke!",
    category: "sfw"
}

module.exports.run = async (bot, msg) => {
    require('.\\functions\\img')('poke', msg);
}
