module.exports = {
    event: "* * * * *"
}

module.exports.call = async bot => {
    const channel = '663303308794134529';
    const chan = bot.channels.cache.get(channel);
    if(chan) return chan.messages.fetch({limit: 100});
}
