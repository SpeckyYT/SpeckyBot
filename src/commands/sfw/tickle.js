module.exports = {
    name: "tickle",
    description: "Gives you a tickle!",
    category: "sfw"
}

module.exports.run = async (bot, msg) => {
    require('.\\functions\\img')('tickle', msg);
}
