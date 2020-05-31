module.exports = {
    name: "owl",
    description: "Gives you a owl!",
    usage: ``,
    category: `sfw`,
    accessableby: "Members",
    aliases: []
}

module.exports.run = async (bot, msg) => {
    require('./functions/img')('owl', msg);
}
