module.exports = {
    name: "hug",
    description: "Gives you a hug!",
    category: "sfw",
    aliases: []
}

module.exports.run = async (bot, msg) => {
    require('.\\functions\\img')('hug', msg);
}
