module.exports = {
    event: "presenceUpdate"
}

// server limiter
const limited = ["265505748413448193"]

module.exports.call = async (bot, oldPresence, newPresence) => {
    const member = newPresence.member;

    // server limiter
    if(!limited.includes(member.guild.id)) return;

    const status = member.user.presence.status;

    if(!["offline","idle"].includes(status)) return;

    const muskRole = "636272631984947240"
    const muskGateRole = "663303390620680193"

    if(member.roles.has(muskRole)){
        try{
            member.removeRole(muskRole)
        }catch{}

        try{
            member.addRole(muskGateRole)
        }catch{}
    }
}
