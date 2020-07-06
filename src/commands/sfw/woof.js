module.exports = {
    name: "woof",
    description: "Gives you a dog!",
    usage: ``,
    category: `sfw`,
    aliases: ["dog"]
}

module.exports.run = async (bot, msg) => {
    require('./functions/img')('woof', msg);
}
