module.exports = {
    name: "duck",
    description: "Gives you a duck!",
    usage: ``,
    category: `sfw`,
    accessableby: "Members",
    aliases: []
}

module.exports.run = async (bot, msg) => {
    require('./functions/img')('duck', msg);
}
