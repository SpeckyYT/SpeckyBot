module.exports = {
    name: "advertisement",
    description: "Gives you a SpeckyBot Advertisement!",
    usage: "",
    category: `misc`,
    aliases: ["advertisements"]
}

module.exports.run = (bot, msg) => {
    return msg.channel.send(
        bot.embed()
        .setTitle("Why Should People Use SpeckyBot?")
        .setDescription("TL;DR SpeckyBot is great for simple people searching for great times.")
        .addField(
            "1) SpeckyBot has more than 150 commands available for everyone",
            "those are enough for everyone!"    
        )
        .addField(
            "2) SpeckyBot has a lot of cool features",
            "for example `global channel` `channel topic filters` and other more!"
        )
        .addField(
            "3) SpeckyBot is Open-Source and is regularly mantained",
            "because a good bot requires good maintenance!"
        )
        .addField(
            "4) SpeckyBot has a foolproof way for writing any kind of command",
            "perfect for any newcomer to coding in JavaScript!"
        )
    )
}
