module.exports = {
    event: "reconnecting"
}

module.exports.call = async (bot) => {
    bot.setTimeout(()=>{
        if(bot.status !== 0){
            console.log("REBOOTING BOT [took too long to reconnect]".fatal)
            require('..\\..\\bot')(bot);
        }
    }, 30000)
}
