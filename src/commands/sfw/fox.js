module.exports = {
    name: "fox",
    description: "Gives you a fox!",
    usage: "",
    category: `sfw`,
    aliases: []
}

module.exports.run = async (bot, msg) => {
    require('.\\functions\\img')('fox', msg);
}
