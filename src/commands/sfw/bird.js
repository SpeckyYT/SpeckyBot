module.exports = {
    name: "bird",
    description: "Gives you a bird!",
    usage: "",
    category: `sfw`,
    aliases: ['birb']
}

module.exports.run = async (bot, msg) => {
    require('.\\functions\\img')('bird', msg);
}
