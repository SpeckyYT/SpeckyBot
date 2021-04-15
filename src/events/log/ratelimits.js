module.exports = {
    event: 'rateLimit'
}

module.exports.call = async (bot, ratelimits) => {
    const channel = bot.channels.cache.get("795608330844373013");
    if(!channel) return;

    return channel.send(JSON.stringify(ratelimits,null,2).code('json'))
}
