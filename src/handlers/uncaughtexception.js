module.exports = async () => {
    if(process.listeners("uncaughtException").length > 0) return;

    process.on("uncaughtException",(error) => {
        console.log("UNCAUGHT EXCEPTION HAPPENED!".fatal);
        console.error(error);
    })
}
