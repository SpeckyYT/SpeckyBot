module.exports.run = async (bot, msg, args) => {
    msg.channel.send('Pinging...').then(m =>{
        let ping = m.createdTimestamp - msg.createdTimestamp;
        m.edit(`Bot Latency: \`${ping}ms\`\nAPI Latency: \`${Math.round(bot.ping)}ms\``)
    });
}

module.exports.config = {
    name: "ping",
    aliases: ["pong", "pin", "pon"]
}