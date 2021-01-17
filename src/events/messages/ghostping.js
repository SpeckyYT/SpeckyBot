module.exports = {
    event: "messageDelete"
}

const qdb = require('quick.db');
const usersettings = new qdb.table('usersettings');

module.exports.call = async (bot, msg) => {
    if(msg.author.bot) return;
    if(msg.channel.type !== 'text') return;
    if((new Date().getTime() - msg.createdTimestamp) > 60000) return;

    if(!msg.mentions.members.size) return;

    msg.mentions.members.forEach(member => {
        if(msg.author.id != member.user.id && !member.user.bot){
            if(!usersettings.get(`${member.user.id}.ghostping`)) return;
            if(!member.permissionsIn(msg.channel).has('VIEW_CHANNEL')) return;

            return member.send(
                bot.embed()
                .setTitle('Ghostping')
                .setThumbnail(msg.guild.iconURL())
                .setColor('#000000')
                .setDescription(`You have been Ghostpinged by\n\n**${msg.author.tag}** [${msg.author.id}]\n\nin the server\n\n**${msg.guild}** [${msg.guild.id}]\n\nContent: ${msg.content}`)
                .setImage(msg.author.displayAvatarURL({format:'png'}))
                .setFooter(`Date of the ghostping`)
                .setTimestamp()
            );
        }
    })

}
