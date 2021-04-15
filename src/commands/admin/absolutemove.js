module.exports = {
    name: "absolutemove",
    description: "Moves all users from one VC to another one!",
    usage: `<vocalchannelID> <vocalchannelID>`,
    category: "admin",
    aliases: ["am","moveid","idmove"],
    userPerms: 16777216,
    botPerms: 16777216
}

module.exports.run = async (bot, msg) => {
    const { args } = msg;
    if(!args[0]){
        return bot.cmdError("You didn't include a Voice Channel ID.")
    }
    if(isNaN(args[0])){
        return bot.cmdError("The Vocal Channel ID (#1) is invalid.")
    }
    let VC1;
    if(!args[1]){

        if(!msg.member.voice.channel){
            return bot.cmdError("You aren't in a Voice Channel.")
        }

        VC1 = msg.member.voice.channel;

        VC1.members.forEach(member => {
            try{
                member.voice.setChannel(args[0]);
            }catch{
                return bot.cmdError("Error happend (Wrong ID?)")
            }
        })

    }else{
        if(isNaN(args[1])){
            return bot.cmdError("The Vocal Channel ID (#2) is invalid.")
        }

        try{
            VC1 = bot.channels.cache.get(args[0]);
        }catch{
            return bot.cmdError("Error happend (Wrong ID?)")
        }

        VC1.members.forEach(member => {
            try{
                member.voice.setChannel(args[1]);
            }catch{
                return bot.cmdError("Error happend (Wrong ID?)")
            }
        })
    }
}
