module.exports = {
    name: "clean",
    description: "Deletes a message for you!",
    usage: `<bots/users>`,
    category: "admin",
    aliases: ["cls"],
    userPerms: ['MANAGE_MESSAGES'],
    botPerms: ['MANAGE_MESSAGES']
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

    return msg.channel.messages
    .fetch({limit: size})
    .then(msgs => msgs.map(ms => isBot == ms.author.bot ? ms.delete() : null));
}
