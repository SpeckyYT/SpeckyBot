//server limiter
const limited = ["265505748413448193"]

module.exports = async (bot, oldMember, newMember) => {
    let member = newMember;

    //server limiter
    if(!limited.includes(member.guild.id)) return;

    if(member.user.presence.status != "offline") return;

    let muskRole = "636272631984947240"

    if(member.hasRole(muskRole)){
        try{
            member.removeRole(muskRole)
        }catch{return}
    }
}

module.exports.config = {
    event: "presenceUpdate"
}
