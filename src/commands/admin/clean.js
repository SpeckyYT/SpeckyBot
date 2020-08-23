module.exports = {
    name: "clean",
    description: "Deletes a message for you!",
    usage: `<bots/users>`,
    category: `admin`,
    aliases: ["cls"],
    perms: ['MANAGE_MESSAGES'],
    cmdperms: ['MANAGE_MESSAGES']
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

    switch(cmd){
        case "bots":
        case "bot":
        case "robot":
        case "robots":
            msg.channel.fetchMessages({limit: size}).then(msgs => {
                msgs.forEach(ms => {
                    if(ms.author.bot){
                        ms.delete();
                    }
                })
            });
            break;
        case "users":
        case "user":
        case "member":
        case "members":
            msg.channel.fetchMessages({limit: size}).then(msgs => {
                msgs.forEach(ms => {
                    if(!ms.author.bot){
                        ms.delete();
                    }
                })
            });
            break;
        default:
            return bot.cmdError(`Sub-command **${cmd}** not found.\nAvaiable ones: \`bots\` and \`users\``)
    }
}
