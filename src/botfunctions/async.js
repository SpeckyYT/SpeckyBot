module.exports = (bot) => {
    bot.async = () => new Promise(res => bot.setImmediate(res));
}
