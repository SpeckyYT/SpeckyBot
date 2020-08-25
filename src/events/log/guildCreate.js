module.exports = {
    event: "guildCreate"
}

module.exports.call = async (bot, guild) => {
    const channel = bot.channels.get("738849306643267674");
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
        .setFooter(`${bot.guilds.size} Guilds`)
        .setColor("#00FF00")
    );
}
