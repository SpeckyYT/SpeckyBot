module.exports = {
    event: "error"
}

module.exports.call = async () => {
    bot.log()
    bot.log("Error occurred (REBOOTING)")
    bot.log()
    process.exit();    
}
