module.exports = {
    name: "blowjob",
    description: "Gives you a blow job!",
    category: `nsfw`,
    aliases: ["bj"]
}

module.exports.run = async (bot, msg) => {
    require('.\\functions\\img')(["bJ","blowJob"],msg);
}
