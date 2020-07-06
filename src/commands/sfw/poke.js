module.exports = {
    name: "poke",
    description: "Gives you a poke!",
    usage: ``,
    category: `sfw`,
    aliases: []
}

module.exports.run = async (bot, msg) => {
    require('./functions/img')('poke', msg);
}
