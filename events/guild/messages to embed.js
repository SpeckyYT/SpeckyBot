module.exports = {
    event: "message"
}

const { RichEmbed } = require('discord.js')

module.exports.call = async (bot, msg) => {
    if (msg.author.id == bot.user.id || msg.author.bot) return;

    const s_settings = require('../../s_settings.json')
    const u_settings = require('../../u_settings.json')
    let color;

    if(u_settings[msg.author.id] ? u_settings[msg.author.id].embedcolor : false){
        color = `${u_settings[msg.author.id].embedcolor}`;
    }else{
        color = `${(Math.random()*0xFFFFFF<<0).toString(16)}`;
    }

    let perms = msg.guild.me.permissionsIn(msg.channel).toArray();
    if(perms.includes('MANAGE_MESSAGES') && perms.includes('SEND_MESSAGES')){
        if(msg.content.includes(':EMB:')){
            await msg.delete().catch(()=>{return})
            msg.content = msg.content.replace(/(:EMB:)/g,'').trim();
            if(msg.content){
                let embed = new RichEmbed()
                    .setAuthor(`${msg.author.username}`, `${msg.author.avatarURL}`)
                    .setDescription(`${msg.content}`)
                    .setColor(`${color}`);
                await msg.channel.send(embed);
            }
            await atts(msg,color)
            return;
        }
    }else{
        return;
    }

    try{
        if(s_settings[msg.guild.id] ?
            (s_settings[msg.guild.id].mtechannel ?
                s_settings[msg.guild.id].mtechannel.includes(msg.channel.id)
            : false)
        : false){
            try{
                await msg.delete();
                if(msg.content){
                    var embed = new RichEmbed()
                        .setAuthor(`${msg.author.username}`, `${msg.author.avatarURL}`)
                        .setDescription(`${msg.content}`)
                        .setColor(`${color}`);
                    await msg.channel.send(embed);
                }
                await atts(msg,color)
            }catch(e){}
        }   
    }catch(err){console.error(err)}
}

async function atts(msg,color) {
    msg.attachments.forEach(async att  => {
        let emb = new RichEmbed()
        .setAuthor(`${msg.author.username}`, `${msg.author.avatarURL}`)
        .setImage(`${att.proxyURL}`)
        .setColor(color);
        msg.channel.send(emb);
    })
}
