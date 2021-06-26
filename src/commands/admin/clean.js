module.exports = {
    name: "clean",
    description: "Deletes a message for you!",
    usage: `<bots/users>`,
    category: "admin",
    aliases: ["cls"],
    userPerms: 8192n,
    botPerms: 8192n
}

module.exports.run = async (bot, msg) => {
    let cmd, size;

    if(isNaN(msg.args[0])){
        cmd = msg.args[0]
        size = msg.args[1]
    }else{
        size = msg.args[0]
        cmd = msg.args[1]
    }

    if(isNaN(size)){
        size = 25;
    }

    if(size < 1){
        size = 25;
    }

    let isBot;

    switch(cmd){
        case "bots":
        case "bot":
        case "robot":
        case "robots":
            isBot = true; break;
        case "users":
        case "user":
        case "member":
        case "members":
            isBot = false; break;
        default:
            return bot.cmdError(`Sub-command **${cmd}** not found.\nAvaiable ones: \`bots\` and \`users\``);
    }

    try {
        const filtered = await message.channel.messages
        .fetch({ limit: size })
        .filter(m => isBot == m.author.bot);
        return await msg.channel.bulkDelete(filtered, true);
    } catch (e) {
        return bot.cmdError(e.message)
    };
}
