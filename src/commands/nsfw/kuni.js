module.exports = {
    name: "kuni",
    description: "Gives you a kuni!",
    category: "nsfw"
}

module.exports.run = async (bot, msg) => {
    require('.\\functions\\img')('kuni', msg);
}
