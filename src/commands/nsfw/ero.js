module.exports = {
    name: "ero",
    description: "Gives you erotic images!",
    category: `nsfw`,
    aliases: ["erotic"]
}

module.exports.run = async (bot, msg) => {
    require('.\\functions\\img')(["holoEro","eroFeet","ero","eroKitsune","eroKemonomimi","eroNeko","eroYuri"],msg);
}
