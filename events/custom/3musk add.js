//server limiter
const limited = ["265505748413448193"]

module.exports = async (bot, messageReaction, user) => {
    if(user.bot) return;
    
    let msg = messageReaction.message;
    let guild = msg.guild;

    //server limiter
    if(!limited.includes(guild.id)) return;

    if(msg.id != '663303735023501314') return;
    
    if(["offline","idle"].includes(user.presence.status)) return;

    guild.fetchMember(user)
    .then(async member => {
        let muskRole = "636272631984947240"
        let muskGateRole = "663303390620680193"

        if(member.roles.has(muskGateRole)){
            try{
                member.removeRole(muskGateRole)
            }catch{}

            try{
                member.addRole(muskRole)
            }catch{}
        }
    }).catch()
}

module.exports.config = {
    event: "messageReactionAdd"
}
