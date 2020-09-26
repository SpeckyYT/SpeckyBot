module.exports = {
    name: "createinvite",
    description: "Creates an invite to a server and deletes it when you join.",
    usage: `<guildID>`,
    category: "owner",
    aliases: ["ci"]
}

module.exports.run = async (bot, msg) => {
    const guildID = msg.args[0];
    if(!guildID) return bot.cmdError("No GuildID provided");
    const guild = bot.guilds.cache.get(guildID);
    if(!guild) return bot.cmdError(`${guildID} is not a valid guild`);
    if(!guild.me.permissions.has("CREATE_INSTANT_INVITE")) return bot.cmdError("Bot doesn't have the permissions on that guild");
    const channel = guild.channels.cache.filter(c => c.type == "text").random();
    const invite = await channel.createInvite({maxUses: 1, maxAge: 150, unique: true});
    return msg.author.send(`Here's server link ;)\n${invite}`);
}
