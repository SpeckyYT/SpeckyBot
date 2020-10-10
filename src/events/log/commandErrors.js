module.exports = {
    event: 'commandError'
}

module.exports.call = async (bot, error, msg) => {
    const channel = bot.channels.cache.get("764555141280956426");
    if(!channel) return;
    bot.log(error);
    if(error) return channel.send([
        `Author: ${msg.author} (${msg.author.id})`,
        `Channel: ${msg.channel} (${msg.channel.id})`,
        `Guild: ${msg.guild.name} (${msg.guild.id})`,
        `Command: \`${msg.command}\` (\`${bot.getCommand(msg.command).name}\`)`,
        String(error).slice(0,1750).code()
    ].join('\n'));
}
