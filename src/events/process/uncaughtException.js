module.exports = {
    event: "uncaughtException",
    emitter: "process"
}

module.exports.call = async (bot, error, origin) => {
    await bot.log("UNCAUGHT EXCEPTION HAPPENED!".fatal);
    await bot.log(origin);
    await bot.log(error);
}
