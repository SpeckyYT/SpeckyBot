module.exports = {
    name: "slap",
    description: "Gives you a slap!",
    usage: ``,
    category: `sfw`,
    accessableby: "Members",
    aliases: []
}

module.exports.run = async (bot, msg) => {
    require('./functions/img')('slap', msg);
}
