module.exports = {
    event: "ready"
}

module.exports.call = async bot => {
    let guild = '265505748413448193';
    let channel = '663303308794134529';

    bot.guilds.get(guild).channels.get(channel).fetchMessages({limit: 5})
}
