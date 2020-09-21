module.exports = {
    name: "presences",
    description: "Says how many people are playing different games in the server.",
    category: "misc",
    aliases: ["prsncs","prs"]
}

const { MessageEmbed } = require("discord.js");

module.exports.run = async (bot, msg) => {

    const embed = new MessageEmbed()
    .setTitle("These are the server's most played games at the moment:");
    /*
    let presences;
    await msg.guild.members.cache.forEach(memb => {
        if(!presences[memb.presence.game] && memb.presence.game != null){
            presences[memb.presence.game] = []
        }
        presences[memb.presence.game].push(1);
    })

    console.log(presences.join('\n'))

    embed.setDescription(presences)
    */
    msg.channel.send(embed)
}
