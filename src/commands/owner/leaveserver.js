module.exports = {
    name: "leaveserver",
    description: "The bot will leave the desired server!",
    usage: `<serverID>`,
    category: `owner`,
    accessableby: "Bot Owner",
    aliases: ["ls","sl","serverleave"]
}

module.exports.run = async (bot, msg) => {
    const { args } = msg;
    if(!args[0]) return msg.channel.send("You have to define a server");
    const guild = bot.guilds.get(args[0]);
    try{
        guild.leave();
        msg.channel.send("It should have worked!")
    }catch(e){
        msg.channel.send("An error occourred")
    }
}
