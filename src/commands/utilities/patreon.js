module.exports = {
    name: "patreon",
    description: "Do you want to add this bot to your server?",
    usage: ``,
    category: `utilities`,
    accessableby: "Members",
    aliases: ["patr","patreo"]
}

module.exports.run = async (bot, msg) => {
    const embed = bot.embed()
        .setTitle('Patreon Page!')
        .setDescription(`[**Patreon**](https://patreon.com/SpeckyBot)`)
        .addField(`Patreons:`, `*Nobody... but you can be this first!*`)
    msg.channel.send(embed);
}
