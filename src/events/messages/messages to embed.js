module.exports = {
    event: "cleanMessage"
}

const qdb = require('quick.db');
const usersettings = new qdb.table('usersettings');
const { MessageEmbed } = require('discord.js');

module.exports.call = async (bot, msg) => {
    const setting = usersettings.get(`${msg.author.id}.embedcolor`);
    const color = typeof setting == 'number' ? setting : (Math.random()*0xFFFFFF<<0).toString(16);

    const perms = msg.guild ? msg.guild.me.permissionsIn(msg.channel).toArray() : [];
    if(perms.includes(8192n) && perms.includes(2048n) || !msg.guild){
        if(msg.content.includes(':EMB:')){
            msg.delete().catch(()=>{})
            msg.content = msg.content.replace(/\s?(:EMB:)\s?/g,' ').trim();
            if(msg.content){
                msg.channel.send(
                    bot.globalChatEmbed(msg)
                    .setColor(color)
                );
            }
            return atts(msg,color);
        }
    }
}

function atts(msg,color) {
    msg.attachments
    .forEach(att =>
        msg.channel.send(
            new MessageEmbed()
            .setAuthor(`${msg.author.username}`, `${msg.author.displayAvatarURL()}`)
            .setImage(`${att.proxyURL}`)
            .setColor(color)
        )
    )
}
