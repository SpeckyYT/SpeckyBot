module.exports = {
    name: "slap",
    description: "Gives you a slap!",
    category: "sfw"
}

module.exports.run = async (bot, msg) => {
    require('.\\functions\\img')('slap', msg);
}
