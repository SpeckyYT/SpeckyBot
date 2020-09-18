module.exports = {
    name: "kiss",
    description: "Gives you a kiss!",
    category: "sfw",
    aliases: []
}

module.exports.run = async (bot, msg) => {
    require('.\\functions\\img')('kiss', msg);
}
