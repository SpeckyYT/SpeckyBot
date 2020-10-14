module.exports = {
    event: "uncaughtException",
    emitter: "process"
}

module.exports.call = (bot, error, origin) => {
    bot.log("UNCAUGHT EXCEPTION HAPPENED!".fatal);
    bot.error(origin);
    bot.error(error);
}
