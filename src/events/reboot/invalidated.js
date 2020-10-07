module.exports = {
    event: 'invalidated'
}

module.exports.call = (bot) => {
    bot.log('REBOOT! REASON: invalidated');
    process.exit(0);
}
