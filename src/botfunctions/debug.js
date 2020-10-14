module.exports = (bot) => {
    bot.cmdError = (error) => {
        return new Promise((resolve, reject) => reject(`[EXPECTED] ${error}`))
    }

    bot.cmdSuccess = (success) => {
        return new Promise((resolve,reject) => resolve(`[SUCCESS] ${success}`))
    }
}
