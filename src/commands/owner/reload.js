module.exports = {
    name: "reload",
    description: "The bot will reload a specific handler!",
    category: `owner`,
    aliases: ["rld","rl"]
}

module.exports.run = async (bot, msg) => {
    const { time } = bot.reload(msg.args[0]);

    if(time){
        msg.channel.send(`**everything** got reloaded! (${time}ms)`);
        console.log(`${"everything".bold} got reloaded! (${time}ms)`.success);
    }else{
        msg.channel.send(`**everything** didn't got reloaded cause of stupid errors...`);
    }
}
