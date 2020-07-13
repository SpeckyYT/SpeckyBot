module.exports = {
    event: "ready"
}

module.exports.call = async bot => {
    process.title = bot.user.username;
}
