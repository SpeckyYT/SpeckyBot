module.exports = {
    name: "cat",
    description: "Gives you a cat!",
    category: "sfw"
}

module.exports.run = async (bot, msg) => {
    require('.\\functions\\img')('cat', msg);
}
