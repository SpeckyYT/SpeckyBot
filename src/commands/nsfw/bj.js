module.exports = {
    name: "blowjob",
    description: "Gives you a blow job!",
    usage: ``,
    category: `nsfw`,
    accessableby: "Members",
    aliases: ["bj"]
}

module.exports.run = async (bot, msg) => {
    require('./functions/img')(["bJ","blowJob"],msg);
}
