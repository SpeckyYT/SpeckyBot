module.exports = {
    name: "cuddle",
    description: "Cuddles you!",
    usage: "",
    category: `sfw`,
    aliases: []
}

module.exports.run = async (bot, msg) => {
    require('.\\functions\\img')('cuddle', msg);
}
