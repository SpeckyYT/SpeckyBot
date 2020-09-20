module.exports = {
    name: "pat",
    description: "Gives you a pat!",
    category: "sfw"
}

module.exports.run = async (bot, msg) => {
    require('.\\functions\\img')('pat', msg);
}
