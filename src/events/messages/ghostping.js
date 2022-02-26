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
            if(!member.permissionsIn(msg.channel).has(1024n)) return;

            return member.send(
                bot.embed()
                .setTitle('You have been Ghostpinged')
                .setThumbnail(msg.guild.iconURL({format:'png'}))
                .setColor('#000000')
                .addField('User',`${msg.author.tag} [${msg.author.id}]`)
                .addField('Server',`${msg.guild} [${msg.guild.id}]`)
                .addField('Content',`${msg.content}`)
                .setImage(msg.author.displayAvatarURL({format:'png'}))
                .setFooter(`Date of the ghostping`)
                .setTimestamp()
            );
        }
    })

}
