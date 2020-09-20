module.exports = {
    name: "baka",
    description: "Gives you a baka!",
    category: "sfw"
}

module.exports.run = async (bot, msg) => {
    require('.\\functions\\img')('baka', msg);
}
