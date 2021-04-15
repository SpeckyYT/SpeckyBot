module.exports = (bot) => {
    bot.sleep = (ms,...args) => new Promise(resolve => bot.setTimeout(resolve, ms,...args));
    bot.delay = bot.sleep;
    bot.wait = bot.sleep;
    bot.pause = bot.sleep;
}
