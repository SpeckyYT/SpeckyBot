const { RichEmbed } = require('discord.js')

//REACTIONS:
const specky = `specky:653319769516146729`




module.exports = async (bot, msg) => {
    if (msg.author.bot || msg.channel.type === "dm") return;

    let contento = msg.content                      //Original one
    let contentl = msg.content.toLowerCase();       //Lower Case one
    let contentu = msg.content.toUpperCase();       //Upper Case one

//--------------REACTIONS-----------------------
    if(contentl.includes('specky')){
        msg.react(specky)
    }

//-----------MESSAGES/RESPONSES-----------------
    if(contentl == "ayy"){
        msg.channel.send('lmao')
    }

    if(contentl == "owo"){
        msg.channel.send(`What's this?`)
    }

//---------------OTHER--------------------------
    if(msg.guild.me.hasPermission('MANAGE_MESSAGES')){
        if(contento.includes(':EMB:')){
            var embed = new RichEmbed()
            .setAuthor(`${msg.author.username}`, `${msg.author.avatarURL}`)
            .setDescription(`${msg.content.replace(':EMB:','')}`)
            .setImage(msg.attachments.url)
            .setColor(`${msg.member.displayHexColor}`);
        await msg.delete();
        await msg.channel.send(embed);
        }


        
    }



}

module.exports.config = {
    event: "message"
}