module.exports = {
    name: "bird",
    description: "Gives you a bird!",
    category: `sfw`,
    aliases: ['birb']
}

module.exports.run = async (bot, msg) => {
    require('.\\functions\\img')('bird', msg);
}
