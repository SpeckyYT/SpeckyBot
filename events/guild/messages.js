const { RichEmbed } = require('discord.js')

//REACTIONS:
const specky = `specky:653319769516146729`




module.exports = async (bot, msg) => {
    if (msg.author.bot || msg.channel.type === "dm") return;

    let contento = msg.content                      //Original one
    let contentl = msg.content.toLowerCase();       //Lower Case one
    let contentu = msg.content.toUpperCase();       //Upper Case one

//--------------REACTIONS-----------------------
    if(msg.guild.me.hasPermission('ADD_REACTIONS')){
        if(contentl.includes('specky')){
            msg.react(specky)
        }


    }

//-----------MESSAGES/RESPONSES-----------------
    if(msg.guild.me.hasPermission('SEND_MESSAGES')){
        if(contentl == "ayy"){
            msg.channel.send('lmao')
        }

        if(contentl == "owo"){
            msg.channel.send(`What's this?`)
        }


    }

//---------------OTHER--------------------------
    if(msg.guild.me.hasPermission('MANAGE_MESSAGES')){

  
    }


}

module.exports.config = {
    event: "message"
}
