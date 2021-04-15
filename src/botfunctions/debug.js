module.exports = (bot) => {
    bot.cmdError = (error) =>
        new Promise((resolve, reject) => reject(`[EXPECTED] ${error}`))

    bot.cmdSuccess = (success) =>
        new Promise((resolve,reject) => resolve(`[SUCCESS] ${success}`))
}
