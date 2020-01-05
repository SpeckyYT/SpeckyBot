//server limiter
const limited = ["265505748413448193"]

module.exports = async (bot, user) => {
    //server limiter
    if(!limited.includes(member.guild.id)) return;

    if(user.presence.status != "offline") return;

    let muskRole = "636272631984947240"
    try{
        guild = bot.guilds.get("265505748413448193");
    }catch{return}

    guild.fetchMember(user)
    .then(member => {
        if(member.hasRole(muskRole)){
            try{
                member.removeRole(muskRole)
            }catch{return}
        }
    })
}

module.exports.config = {
    event: "userUpdate"
}
