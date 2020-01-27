//server limiter
const limited = ["265505748413448193"]

module.exports = async (bot, oldMember, newMember) => {
    if(newMember.user.bot) return;
    
    //server limiter
    if(!limited.includes(newMember.guild.id)) return;

    let memberRole = '265519525041143809'
    let adInStatusRole = '638091940545560639'

    let regex = /(https?:\/\/)?(www\.)?((discord\.(gg|io|me|li)|discordapp\.com\/invite|invite\.gg))(\/|\\\/|\\)[A-z+0-9]{1,}/g;

    newMember.guild.members.forEach(member => {
        member.roles.forEach(role => {
            if(role.id == memberRole){
                if(member.user.presence.game){
                    let game = member.user.presence.game;
    
                    [game.name, game.state].forEach(item => {
                        if(item){
                            if(item.toLowerCase().match(regex)){
                                try{member.addRole(adInStatusRole)}catch(e){}
                                try{member.removeRole(memberRole)}catch(e){}
                            }
                        }
                    })
                }
            }
        })
    })
}

module.exports.config = {
    event: "presenceUpdate"
}

