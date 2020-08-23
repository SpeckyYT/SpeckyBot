module.exports = {
    name: "baka",
    description: "Gives you a baka!",
    usage: "",
    category: `sfw`,
    aliases: []
}

module.exports.run = async (bot, msg) => {
    require('.\\functions\\img')('baka', msg);
}
