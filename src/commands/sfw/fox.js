module.exports = {
    name: "fox",
    description: "Gives you a fox!",
    category: "sfw"
}

module.exports.run = async (bot, msg) => {
    require('.\\functions\\img')('fox', msg);
}
