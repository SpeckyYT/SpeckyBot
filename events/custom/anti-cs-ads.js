//server limiter
const limited = ["265505748413448193"]

module.exports = async (bot, msg) => {
    if(msg.channel.type != "text") return;
    if(msg.author.bot) return;

    //server limiter
    if(!limited.includes(msg.guild.id)) return;

    let memberRole = '265519525041143809'
    let adInStatusRole = '638091940545560639'

    let regex = /(https?:\/\/)?(www\.)?((discord\.(gg|io|me|li)|discordapp\.com\/invite|invite\.gg))(\/|\\\/|\\)[A-z+0-9]{1,}/g;

    msg.guild.members.forEach(member => {

        member.roles.forEach(role => {if(role.id == memberRole) vibeCheck()})
            
        function vibeCheck(){
            if(member.user.presence.game){
                let game = member.user.presence.game;

                function badBoi(){
                    try{member.addRole(adInStatusRole)}catch(e){}
                    try{member.removeRole(memberRole)}catch(e){}
                }

                if(game.name){
                    if(game.name.toLowerCase().match(regex)){
                        badBoi()
                    }
                }
                if(game.state){
                    if(game.state.toLowerCase().match(regex)){
                        badBoi()
                    }
                }
            }else{}
        }
    })
}

module.exports.config = {
    event: "message"
}

