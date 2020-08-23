module.exports = {
    name: "shiba",
    description: "Gives you a shiba!",
    usage: "",
    category: `sfw`,
    aliases: ['shibe']
}

module.exports.run = async (bot, msg) => {
    require('.\\functions\\img')('shiba', msg);
}
