module.exports = {
    name: "baka",
    description: "Gives you a baka!",
    usage: ``,
    category: `sfw`,
    accessableby: "Members",
    aliases: []
}

module.exports.run = async (bot, msg) => {
    require('./functions/img')('baka', msg);
}
