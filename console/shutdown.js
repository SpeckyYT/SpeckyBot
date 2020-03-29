module.exports = {
    name: 'shutdown',
    aliases: ["quit","exit","die","kill","reboot"]
}

module.exports.run = async (bot, data) => {
    process.exit();
}
