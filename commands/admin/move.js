module.exports.run = async (bot, msg, args, config) => {
    if(!msg.member.voiceChannel){return msg.channel.send("You aren't in a Voice Channel.")}
    
    const VC1 = msg.member.voiceChannel;

    msg.channel.send(`Now go to the Voice Channel where you want to move all users of the previous VC\nOnce you're ready, include \`ready\` in your next message (in this text channel)`)
    const filter = m => m.content.includes('ready') && m.author.id == msg.author.id;
    msg.channel.awaitMessages(filter, {max: 1, time: 30000, errors: ['time']})
        .then(mess => {
            mess.forEach(singmsg => {
                if(!singmsg.member.voiceChannel){return msg.channel.send("You aren't in a Voice Channel.")}
                
                const VC2 = singmsg.member.voiceChannel;

                VC1.members.forEach(member => {
                    member.setVoiceChannel(VC2)
                })

            })
        })
}

module.exports.config = {
    name: "move",
	description: "Moves all users from one VC to another one!",
    usage: ``,
    category: `admin`,
	accessableby: "Server Admins and Moderators",
    aliases: ["moveuser","moveu","mu","mov"],
    perms: ['MOVE_MEMBERS'],
    cmdperms: ['MOVE_MEMBERS']
}