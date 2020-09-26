module.exports =
    name: "ping",
    description: "Information about how fast the bot is!",
    category: "utilities",
    aliases: ["pong", "pin", "pon"]
    run: (bot, msg) =>
        msg.channel.send('Pinging...')
        .then((m) =>
            ping = m.createdTimestamp - msg.createdTimestamp;
            m.edit "Bot Latency: \`#{ping}ms\`\nAPI Latency: \`#{Math.round(bot.ws.ping)}ms\`"
        );
