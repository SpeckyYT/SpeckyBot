module.exports = {
    name: "id2member",
    description: "Converts a user id to the username and discriminator.",
    usage: `<userid>`,
    category: "dev",
    aliases: ["i2m"]
}

module.exports.run = async (bot, msg) => {
    const { args } = msg;
    if (!args.length) return bot.cmdError('No ID provided.');
    const id = args[0];
    if (/\D+/g.test(id)) return bot.cmdError('Invalid ID provided.');
    if (bot.users.cache.has(id)) {
        return msg.channel.send(bot.users.cache.get(id).tag);
    } else {
        try {
            return await bot.users.fetch(id)
            .then(u => msg.channel.send(u.tag));
        } catch {
            return msg.channel.send('User not found.');
        }
    }
}
