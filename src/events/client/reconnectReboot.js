module.exports = {
    event: "reconnecting"
}

const { join } = require('path');

module.exports.call = async (bot) => {
    bot.setTimeout(()=>{
        if(bot.status !== 0){
            console.log("REBOOTING BOT [took too long to reconnect]".fatal)
            require(join(process.cwd(),'bot'))(bot);
        }
    }, 30000)
}
