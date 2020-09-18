module.exports = {
    name: "tickle",
    description: "Gives you a tickle!",
    category: "sfw",
    aliases: []
}

module.exports.run = async (bot, msg) => {
    require('.\\functions\\img')('tickle', msg);
}
