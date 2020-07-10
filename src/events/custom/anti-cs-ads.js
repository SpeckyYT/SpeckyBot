module.exports = {
    event: "presenceUpdate"
}

// server limiter
const limited = ["265505748413448193"]

module.exports.call = async (bot, oldMember, newMember) => {
    if(newMember.user.bot) return;
    
    // server limiter
    if(!limited.includes(newMember.guild.id)) return;

    const removeRoles = ['607522930800459789','269841158694371329','605392884526612524','599988443476525087','309678822435848204','268409019641626626','268409297338105867','265519525041143809']
    const addRoles = ['638091940545560639']

    const regex = /(https?:\/\/)?(www\.)?((discord\.(gg|io|me|li)|discordapp\.com\/invite|invite\.gg))(\/|\\\/|\\)[A-z+0-9]{1,}/g;

    newMember.guild.members.forEach(member => {
        member.roles.forEach(role => {
            if(role.id == removeRoles){
                if(member.user.presence.game){
                    const game = member.user.presence.game;
    
                    [game.name, game.state].forEach(item => {
                        if(item){
                            if(item.toLowerCase().match(regex)){
                                try{
                                    member.addRole(addRoles)
                                }catch(e){}
                                try{
                                    member.removeRole(removeRoles)
                                }catch(e){}
                            }
                        }
                    })
                }
            }
        })
    })
}
