module.exports = {
    event: 'invalidated'
}

module.exports.call = async (bot) => {
    await bot.log('REBOOT! REASON: invalidated'.fatal);
    process.exit(0);
}
