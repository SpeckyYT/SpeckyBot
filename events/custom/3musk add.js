//server limiter
const limited = ["265505748413448193"]

module.exports = async (bot, messageReaction, user) => {
    let guild = messageReaction.message.guild;

    //server limiter
    if(!limited.includes(guild.id)) return;

    guild.fetchMember(user)
    .then(async member => {

        let muskRole = "636272631984947240"
        let muskGateRole = "663303390620680193"

        if(member.roles.has(muskGateRole)){
            await messageReaction.remove(user);

            try{
                member.removeRole(muskGateRole)
            }catch{}

            try{
                member.addRole(muskRole)
            }catch{}
        }
    })
}

module.exports.config = {
    event: "messageReactionAdd"
}
