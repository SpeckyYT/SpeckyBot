module.exports = {
    name: 'drawlink',
    aliases: ['dl','lastdraw','lastdrawing','ld']
}

module.exports.run = async (bot, data) => {
    console.log(String(bot.cache.console.drawlink).red);
}
