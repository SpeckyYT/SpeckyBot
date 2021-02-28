module.exports = {
    event: "globalChatAdded"
}

module.exports.call = async (bot, c) => {
    const channel = bot.channels.cache.get("741334170638483628");
    if(!channel) return;

    const data = [
        ["Guild ID", c.guild.id],
        ["Channel ID", c.id]
    ]

    await bot.wait(1000);

    const gcs = bot.globalchats.size;

    return channel.send(
        bot.embed()
        .setTitle(c.name)
        .setDescription(
            data.map(d => `**${d[0]}:** ${d[1]}`).join("\n")
        )
        .setFooter(`${gcs} Global Chats`)
        .setColor("#00FF00")
    );
}
