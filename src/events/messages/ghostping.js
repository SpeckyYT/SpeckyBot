module.exports = {
    event: "messageDelete"
}

const { join } = require('path');

module.exports.call = async (bot, msg) => {
    if(msg.author.bot) return;
    if(msg.channel.type !== 'text') return;
    if((new Date().getTime() - msg.createdTimestamp) > 60000) return;

    const u_settings = require(join(process.cwd(),'..','db','u_settings.json'));

    if(msg.mentions.members.cache.first()){
        msg.mentions.members.cache.forEach(member => {
            if(msg.author.id != member.user.id && !member.user.bot){
                if(u_settings[member.user.id] ? !u_settings[member.user.id].ghostping : true) return;

                return member.send(
                    bot.embed()
                    .setTitle('Ghostping')
                    .setThumbnail(msg.guild.iconURL)
                    .setColor('#000000')
                    .setDescription(`You have been Ghostpinged by\n\n**${msg.author.tag}** [${msg.author.id}]\n\nin the server\n\n**${msg.guild}** [${msg.guild.id}]`)
                    .setImage(msg.author.avatarURL())
                    .setFooter(`Date of the ghostping`)
                    .setTimestamp()
                ).catch(()=>{});
            }
        })
    }
}
