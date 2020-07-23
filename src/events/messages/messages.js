module.exports = {
    event: "message"
}

// REACTIONS:
const specky = `specky:653319769516146729`
const crafter = `crafter:646808734483611669`



module.exports.call = async (bot, msg) => {
    if (msg.author.bot || msg.channel.type === "dm") return;

    // const contento = msg.content;                     // Original one
    const contentl = msg.content.toLowerCase();       // Lower Case one
    // const contentu = msg.content.toUpperCase();       // Upper Case one

    // --------------REACTIONS-----------------------
    if(msg.guild.me.hasPermission('ADD_REACTIONS')){
        if(contentl.includes('specky')){
            msg.react(specky).catch(()=>{});
        }

        if(contentl.includes('crafter')){
            msg.react(crafter).catch(()=>{});
        }

        if(contentl.replace(/[^a-z0-9]/g,'') == 'hai'){
            msg.react('🦈').catch(()=>{});
        }

    }

    // -----------MESSAGES/RESPONSES-----------------
    if(msg.guild.me.hasPermission('SEND_MESSAGES')){


    }

    // ---------------OTHER--------------------------
    if(msg.guild.me.hasPermission('MANAGE_MESSAGES')){

  
    }


}
