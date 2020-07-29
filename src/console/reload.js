module.exports = {
    name: 'reload',
    aliases: ['rl','rld']
}

module.exports.run = async (bot, data) => {
    if(data.args[0] == "bot"){
        delete require.cache;
        require('../bot')(bot);
    }else{
        const { time } = bot.reload();
        console.log(`${"everything".bold} got reloaded! (${time}ms)`.success);
    }
}
