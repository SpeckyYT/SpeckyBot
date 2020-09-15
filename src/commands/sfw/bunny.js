module.exports = {
    name: "bunny",
    description: "Gives you a bunny!",
    category: `sfw`,
    aliases: ['rabbit']
}

module.exports.run = async (bot, msg) => {
    require('.\\functions\\img')('bunny', msg);
}
