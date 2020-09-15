module.exports = {
    name: "dog",
    description: "Gives you a dog!",
    category: `sfw`,
    aliases: ['doggo']
}

module.exports.run = async (bot, msg) => {
    require('.\\functions\\img')('dog', msg);
}
