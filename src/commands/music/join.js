module.exports = {
    name: "join",
    description: "Makes the bot join a VC!",
    usage: ``,
    category: `music`,
    accessableby: "Members",
    aliases: ["j"]
}

module.exports.run = async (bot, msg) => {
    if(msg.member.voiceChannel){
        msg.member.voiceChannel.join()
    }else{
        msg.channel.send("You aren't in a voice channel")
    }
}
