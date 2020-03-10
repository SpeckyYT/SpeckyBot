module.exports = {
    name: 'shutdown',
    aliases: ["quit","exit","die","kill","reboot"]
}

module.exports.run = async (bot, args) => {
    process.exit();
}
