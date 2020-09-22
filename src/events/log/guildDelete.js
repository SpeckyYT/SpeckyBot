module.exports = {
    event: "guildDelete"
}

module.exports.call = async (bot, guild) => {
    const channel = bot.channels.cache.get("738850039459479585");
    if(!channel) return;

    const data = [
        ["GuildID", guild.id],
        ["Members", guild.memberCount],
        ["Permissions", ((guild.me||{}).permissions||{}).bitfield]
    ]

    return channel.send(
        bot.embed()
        .setTitle(guild.name)
        .setDescription(
            data.map(d => `**${d[0]}:** ${d[1]}`).join("\n")
        )
        .setFooter(`${bot.guilds.cache.size} Guilds`)
        .setColor("#FF0000")
    );
}
