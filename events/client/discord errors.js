module.exports = async () => {
    bot.log()
    bot.log("Error occurred (REBOOTING)")
    bot.log()
    process.exit();    
}

module.exports.config = {
    event: "error"
}