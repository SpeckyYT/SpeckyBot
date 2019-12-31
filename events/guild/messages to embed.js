const { RichEmbed } = require('discord.js')

module.exports = async (bot, msg) => {
    if (msg.author.id == bot.user.id || msg.channel.type == "dm") return;

    const s_settings = require('../../s_settings.json')
    const u_settings = require('../../u_settings.json')
    let color;

    if(u_settings[msg.author.id]){
        if(u_settings[msg.author.id].embedcolor){
            color = `${u_settings[msg.author.id].embedcolor}`;
        }
    }else{
        color = `${(Math.random()*0xFFFFFF<<0).toString(16)}`;
    }

    let perms = msg.guild.me.permissionsIn(msg.channel).toArray();
    if(perms.includes('MANAGE_MESSAGES') && perms.includes('SEND_MESSAGES')){
        await msg.delete().catch(()=>{return})
        if(msg.content.includes(':EMB:')){
            msg.content = msg.content.replace(':EMB:','').trim();
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
        if(s_settings[msg.guild.id]){
            if(s_settings[msg.guild.id].mtechannel){
                if(s_settings[msg.guild.id].mtechannel.includes(msg.channel.id)){
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
                    }catch(e){
                        console.log(`MTE ERROR: ${msg.channel.id}, ${msg.guild.id}`);
                    }
                }
            }
        }   
    }catch(err){console.log(err)}
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

module.exports.config = {
    event: "message"
}
