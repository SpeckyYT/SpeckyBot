module.exports = {
    name: "move",
    description: "Moves all users from one VC to another one!",
    category: "admin",
    aliases: ["moveuser","moveu","mu","mov"],
    userPerms: ['MOVE_MEMBERS'],
    botPerms: ['MOVE_MEMBERS']
}

module.exports.run = async (bot, msg) => {
    if(!msg.member.voice.channel){
        return bot.cmdError("You aren't in a Voice Channel.")
    }

    const VC1 = msg.member.voice.channel;

    msg.channel.send(`Now go to the Voice Channel where you want to move all users of the previous VC\nOnce you're ready, include \`ready\` in your next message (in this channel)`)
    const filter = m => m.content.toLowerCase().includes('ready') && m.author.id == msg.author.id;
    msg.channel.awaitMessages(filter, {max: 1, time: 30000, errors: ['time']})
    .then(mess => {
        mess.forEach(singmsg => {
            if(!singmsg.member.voice.channel){
                return bot.cmdError("You aren't in a Voice Channel.")
            }

            const VC2 = singmsg.member.voice.channel;

            VC1.members.forEach(member => {
                member.voice.setChannel(VC2)
            })

        })
    })
}
