module.exports = {
    name: "dog",
    description: "Gives you a dog!",
    usage: ``,
    category: `sfw`,
    accessableby: "Members",
    aliases: ['doggo']
}

module.exports.run = async (bot, msg) => {
    require('./functions/img')('dog', msg);
}
