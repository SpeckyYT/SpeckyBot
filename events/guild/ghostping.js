const { RichEmbed } = require('discord.js')

module.exports = async (bot, msg) => {
    if(msg.author.bot) return;
    if(msg.mentions.members.first()){
        msg.mentions.members.forEach(member => {
            if(msg.author.id != member.user.id && !member.user.bot){
                member.send(new RichEmbed()
                    .setTitle('Ghostping')
                    .setThumbnail(msg.guild.iconURL)
                    .setColor('#000000')
                    .setDescription(`You have been Ghostpinged by\n\n**${msg.author.tag}** [${msg.author.id}]\n\nin the server\n\n**${msg.guild}** [${msg.guild.id}]`)
                    .setImage(msg.author.avatarURL)
                    .setFooter(`Date of the ghostping`)
                    .setTimestamp(new Date())
                ).catch();
            }
        })
    }
}

module.exports.config = {
    event: "messageDelete"
}
