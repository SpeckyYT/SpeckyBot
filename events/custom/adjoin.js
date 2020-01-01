//server limiter
const limited = ["265505748413448193"]

module.exports = async (bot, member) => {
    //server limiter
    if(!limited.includes(member.guild.id)) return;

    let memberRole = '265519525041143809'
    let adInStatusRole = '638091940545560639'

    setTimeout(() => {
        if(member.roles.includes(adInStatusRole)){
            try{
                member.removeRole(memberRole)
            }catch{}
        }
    },10000)
}

module.exports.config = {
    event: "guildMemberAdd"
}

