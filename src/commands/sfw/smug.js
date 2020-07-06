module.exports = {
    name: "smug",
    description: "Gives you a smug!",
    usage: ``,
    category: `sfw`,
    aliases: []
}

module.exports.run = async (bot, msg) => {
    require('./functions/img')('smug', msg);
}
