module.exports = {
    name: "pat",
    description: "Gives you a pat!",
    category: "sfw",
    aliases: []
}

module.exports.run = async (bot, msg) => {
    require('.\\functions\\img')('pat', msg);
}
