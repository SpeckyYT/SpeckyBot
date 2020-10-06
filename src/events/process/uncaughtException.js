module.exports = {
    event: "uncaughtException",
    emitter: "process"
}

module.exports.call = (bot, error, origin) => {
    console.log("UNCAUGHT EXCEPTION HAPPENED!".fatal);
    console.error(origin);
    console.error(error);
}
