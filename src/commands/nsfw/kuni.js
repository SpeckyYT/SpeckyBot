module.exports = {
    name: "kuni",
    description: "Gives you a kuni!",
    usage: ``,
    category: `nsfw`,
    accessableby: "Members",
    aliases: []
}

module.exports.run = async (bot, msg) => {
    require('./functions/img')('kuni', msg);
}
