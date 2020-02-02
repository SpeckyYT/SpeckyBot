module.exports = {
    event: "interval_1_min"
}

module.exports.call = async bot => {
    let channel = '663303308794134529';
    let chan = bot.channels.get(channel);
    if(chan) chan.fetchMessages({limit: 10});
}
