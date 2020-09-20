module.exports = {
    name: "owl",
    description: "Gives you a owl!",
    category: "sfw"
}

module.exports.run = async (bot, msg) => {
    require('.\\functions\\img')('owl', msg);
}
