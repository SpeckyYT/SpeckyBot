module.exports = (bot) => {
    bot.debug = () => {
        console.log(bot.debugN++)
    }

    bot.resetDebug = () => {
        bot.debugN = 0;
    }

    bot.cmdError = (error) => {
        return new Promise((resolve, reject) => reject(`[EXPECTED] ${error}`))
    }
}
