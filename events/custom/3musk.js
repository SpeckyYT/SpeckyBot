//server limiter
const limited = ["265505748413448193"]

module.exports = async (bot, oldMember, newMember) => {
    let member = newMember;

    //server limiter
    if(!limited.includes(member.guild.id)) return;

    if(member.user.presence.status != "offline") return;

    let muskRole = "636272631984947240"
    let muskGateRole = "663303390620680193"


    try{
        member.removeRole(muskRole)
    }catch{}
    try{
        member.addRole(muskGateRole)
    }
}

module.exports.config = {
    event: "presenceUpdate"
}
