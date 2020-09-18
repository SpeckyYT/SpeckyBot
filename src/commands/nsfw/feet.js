module.exports = {
    name: "feet",
    description: "Gives you feets!",
    category: "nsfw",
    aliases: ["foot"]
}

module.exports.run = async (bot, msg) => {
    require('.\\functions\\img')(["feetGif","eroFeet","feet"],msg);
}
