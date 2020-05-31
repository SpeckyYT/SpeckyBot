module.exports = {
    name: "kiss",
    description: "Gives you a kiss!",
    usage: ``,
    category: `sfw`,
    accessableby: "Members",
    aliases: []
}

module.exports.run = async (bot, msg) => {
    require('./functions/img')('kiss', msg);
}
