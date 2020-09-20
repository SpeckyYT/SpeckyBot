module.exports = {
    name: "kiss",
    description: "Gives you a kiss!",
    category: "sfw"
}

module.exports.run = async (bot, msg) => {
    require('.\\functions\\img')('kiss', msg);
}
