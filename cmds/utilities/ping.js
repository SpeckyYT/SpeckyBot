module.exports.run = async (bot, msg, args) => {
    console.log(`Ping: actived by ${msg.author.username} (${msg.author.id})`);
    msg.channel.send('Pinging...').then(m =>{
        let ping = m.createdTimestamp - msg.createdTimestamp;
        m.edit(`Bot Latency: \`${ping}ms\`\nAPI Latency: \`${Math.round(bot.ping)}ms\``)
    });
}

module.exports.help = {
    name: "ping"
}