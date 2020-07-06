module.exports = {
    name: "foxgirl",
    description: "Gives you a fox girl!",
    usage: ``,
    category: `sfw`,
    aliases: ['fox','foxy']
}

module.exports.run = async (bot, msg) => {
    require('./functions/img')('foxGirl', msg);
}
