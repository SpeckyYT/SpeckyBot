module.exports = async bot => {
    let guild = '265505748413448193';
    let channel = '663303308794134529';

    bot.guilds.get(guild).channels.get(channel).fetchMessages({limit: 5})
}

module.exports.config = {
    event: "ready"
}
