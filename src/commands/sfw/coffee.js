module.exports = {
    name: "coffee",
    description: "Gives you a coffee!",
    usage: ``,
    category: `sfw`,
    accessableby: "Members",
    aliases: []
}

module.exports.run = async (bot, msg) => {
    require('./functions/img')("coffee",msg);
}
