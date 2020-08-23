module.exports = {
    name: "ping",
    description: "Information about how fast the bot is!",
    usage: "",
    category: `utilities`,
    aliases: ["pong", "pin", "pon"]
}

module.exports.run = async (bot, msg) => {
    msg.channel.send('Pinging...').then(m =>{
        const ping = m.createdTimestamp - msg.createdTimestamp;
        m.edit(`Bot Latency: \`${ping}ms\`\nAPI Latency: \`${Math.round(bot.ping)}ms\``)
    });
}
