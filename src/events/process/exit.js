module.exports = {
    event: "exit",
    emitter: "process"
}

module.exports.call = async (bot, code) => {
    await bot.log("PROCESS ENDED!".fatal);
    await bot.log(code);
}
