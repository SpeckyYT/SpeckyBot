module.exports = {
    name: "duck",
    description: "Gives you a duck!",
    usage: "",
    category: `sfw`,
    aliases: []
}

module.exports.run = async (bot, msg) => {
    require('.\\functions\\img')('duck', msg);
}
