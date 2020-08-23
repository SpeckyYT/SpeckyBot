module.exports = {
    name: "vc",
    description: "Informations about the vocal channel you're in!",
    usage: "",
    category: `utilities`,
    aliases: ["vocalchannel","vcinfo"]
}

module.exports.run = async (bot, msg) => {
    if(msg.member.voiceChannel){
        const embed = bot.embed()
        .setAuthor(msg.author.username)
        .setDescription("Here are some informations of the vocal channel you're in!")
        .addField("Voice channel name", `${msg.member.voiceChannel}`)
        .addField("Voice channel ID", `${msg.member.voiceChannel.id}`)
        .addField("User limit", `${msg.member.voiceChannel.userLimit}`)
        .addField("Link", `https://discordapp.com/channels/${msg.guild.id}/${msg.member.voiceChannel.id}`);
        msg.channel.send(embed);
    }else{
        return bot.cmdError("You aren't in a voice channel")
    }
}
