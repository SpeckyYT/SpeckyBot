module.exports = {
    name: "charcounter",
    description: "Here you can grab some info from your sentences!",
    usage: `<sentence/word/emotes>`,
    category: "utilities",
    aliases: ["cc","ccounter","sentencestats"]
}

module.exports.run = async (bot, msg) => {
    const contArr = [...msg.cmdContent];

    const embed = bot.embed()
    .setAuthor(msg.author.username);

    return (async function(){
        return [
            ["Characters", msg.cmdContent],
            ["Words", msg.Args],
            ["Alphanumeric", contArr.filter(c => c.match(/\w/g))],
            ["Alphabetic", contArr.filter(c => c.match(/[a-zA-Z]/g))],
            ["Numeric", contArr.filter(c => c.match(/\d/g))],
            ["Special", contArr.filter(c => c.match(/[^\w\s]/g))],
            ["Whitespaces", contArr.filter(c => c.match(/\s/g))]
        ]
        .forEach(contents => embed.addField(contents[0], String(contents[1].length || contents[1]) || "0", true));
    })()
    .then(() => msg.channel.send(embed))
}
