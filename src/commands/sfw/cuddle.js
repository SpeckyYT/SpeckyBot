module.exports = {
    name: "cuddle",
    description: "Cuddles you!",
    category: "sfw"
}

module.exports.run = async (bot, msg) => {
    require('.\\functions\\img')('cuddle', msg);
}
