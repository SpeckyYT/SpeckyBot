const endecode = require('specky-endecode');

module.exports = (bot) => {
    bot.encrypt = endecode;
    bot.decrypt = bot.encrypt;
    bot.encode = bot.encrypt;
    bot.decode = bot.encrypt;
}
