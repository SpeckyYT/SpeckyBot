module.exports = (bot) => {
    bot.sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    bot.delay = bot.sleep;
    bot.wait = bot.sleep;
    bot.pause = bot.sleep;
}
