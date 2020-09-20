module.exports = (bot) => {
    bot.debug = () => {
        console.log(bot._debugN++)
    }

    bot.resetDebug = () => {
        bot._debugN = 0;
    }

    bot.cmdError = (error) => {
        return new Promise((resolve, reject) => reject(`[EXPECTED] ${error}`))
    }

    bot.cmdSuccess = (success) => {
        return new Promise((resolve,reject) => resolve(`[SUCCESS] ${success}`))
    }
}
