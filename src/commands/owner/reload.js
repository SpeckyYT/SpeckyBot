module.exports = {
    name: "reload",
    description: "The bot will reload a specific handler!",
    usage: `<handler>`,
    category: `owner`,
    accessableby: "Bot Owner",
    aliases: ["rld","rl"]
}

module.exports.run = async (bot, msg) => {
    const { time } = bot.reload(msg.args[0]);
    msg.args[0] = msg.args[0] || "everything";
    if(time){
        msg.channel.send(`**${msg.args[0]}** got reloaded! (${time}ms)`);
    }else{
        msg.channel.send(`**${msg.args[0]}** didn't got reloaded cause of stupid errors...`);
    }
}
