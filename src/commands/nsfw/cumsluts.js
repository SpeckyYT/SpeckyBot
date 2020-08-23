module.exports = {
    name: "cumsluts",
    description: "Gives you a cumslut!",
    usage: "",
    category: `nsfw`,
    aliases: ["cumslut","cum","cumshot","cumshots","cs"]
}

module.exports.run = async (bot, msg) => {
    require('.\\functions\\img')(["cumsluts","cumArts"],msg);
}
