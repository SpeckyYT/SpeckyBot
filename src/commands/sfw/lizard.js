module.exports = {
    name: "lizard",
    description: "Gives you a lizard!",
    category: "sfw"
}

module.exports.run = async (bot, msg) => {
    require('.\\functions\\img')('lizard', msg);
}
