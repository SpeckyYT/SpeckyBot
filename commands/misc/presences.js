const { RichEmbed } = require("discord.js");

module.exports.run = async (bot, msg, args, config) => {
    
    var cEmbed = new RichEmbed()
        .setTitle("These are the server's most played games at the moment:");
/*
    var presences;
    await msg.guild.members.forEach(memb => {
        if(!presences[memb.presence.game] && memb.presence.game != null){
            presences[memb.presence.game] = []
        }
        presences[memb.presence.game].push(1);
    })

    console.log(presences.join('\n'))

    cEmbed.setDescription(presences)
*/
    msg.channel.send(cEmbed)
}

module.exports.config = {
    name: "presences",
	description: "Says how many people are playing different games in the server.",
    usage: ``,
    category: `misc`,
	accessableby: "Members",
    aliases: ["prsncs","prs"]
}
