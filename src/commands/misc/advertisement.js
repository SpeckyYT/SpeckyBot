module.exports = {
    name: "advertisement",
    description: "Gives you a SpeckyBot Advertisement!",
    usage: "",
    category: `misc`,
    aliases: ["advertisements","adv"]
}

module.exports.run = (bot, msg) => {
    const emb = bot.embed()
    .setTitle("Why Should People Use SpeckyBot?")
    .setURL(bot.link)
    .setDescription("TL;DR SpeckyBot is great for simple people searching for great times.");

    [
        [
            "SpeckyBot has more than 150 commands available for anyone",
            "those are enough for everyone!"
        ],[
            "SpeckyBot has a lot of cool features",
            "like `global channel` `channel topic filters` and more!"
        ],[
            "SpeckyBot has games which are fun to play",
            "like `speckysays`, `truth or dare`, `bw` and more!"
        ],[
            "SpeckyBot is Open-Source and is regularly mantained",
            "because a good bot requires a lot of maintenance!"
        ],[
            "SpeckyBot has a foolproof way for writing any kind of command",
            "perfect for any newcomer to coding in JavaScript, CoffeeScript or TypeScript!"
        ]
    ]
    .map((adv, i) => emb.addField(`${i+1}) ${adv[0]}`, adv[1]))

    return msg.channel.send(emb);
}
