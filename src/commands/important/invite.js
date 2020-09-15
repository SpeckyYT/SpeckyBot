module.exports = {
    name: "invite",
    description: "Do you want to add this bot to your server?",
    category: "important",
    aliases: ["inv","invit"]
}

module.exports.run = async (bot, msg) => {
    const embed = bot.embed()
    .setTitle('Links!')
    .setDescription(`[SpeckyBot Discord Server](https://discord.gg/4EecFku)\n[Bot Invite](${bot.link})\n[Support This Bot](https://www.paypal.me/speckyy)`)
    return msg.channel.send(embed);
}
