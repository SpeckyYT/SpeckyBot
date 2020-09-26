module.exports = {
    event: "messageReactionAdd"
}

// server limiter
const limited = ["265505748413448193"]

module.exports.call = async (bot, messageReaction, user) => {
    if(user.bot) return;

    const msg = messageReaction.message;
    const guild = msg.guild;

    // server limiter
    if(!limited.includes(guild.id)) return;

    if(msg.id != '663303735023501314') return;

    if(["offline","idle"].includes(user.presence.status)) return;

    guild.members.fetch(user)
    .then(member => {
        const muskRole = "636272631984947240"
        const muskGateRole = "663303390620680193"

        if(member.roles.cache.has(muskGateRole)){
            try{
                member.roles.remove(muskGateRole)
            }catch{}

            try{
                member.roles.add(muskRole)
            }catch{}
        }
    }).catch(()=>{})
}
