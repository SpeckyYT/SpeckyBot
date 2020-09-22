module.exports = {
    name: "vc",
    description: "Informations about the vocal channel you're in!",
    category: "utilities",
    aliases: ["vocalchannel","vcinfo"]
}

module.exports.run = async (bot, msg) => {
    if(msg.member.voice.channel){
        const embed = bot.embed()
        .setAuthor(msg.author.username)
        .setDescription("Here are some informations of the vocal channel you're in!")
        .addField("Voice channel name", `${msg.member.voice.channel}`)
        .addField("Voice channel ID", `${msg.member.voice.channel.id}`)
        .addField("User limit", `${msg.member.voice.channel.userLimit}`)
        .addField("Link", `https://discordapp.com/channels/${msg.guild.id}/${msg.member.voice.channel.id}`);
        msg.channel.send(embed);
    }else{
        return bot.cmdError("You aren't in a voice channel")
    }
}
