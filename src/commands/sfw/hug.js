module.exports = {
    name: "hug",
    description: "Gives you a hug!",
    usage: ``,
    category: `sfw`,
    aliases: []
}

module.exports.run = async (bot, msg) => {
    require('./functions/img')('hug', msg);
}
