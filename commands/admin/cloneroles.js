const Discord = require("discord.js");

module.exports.run = async (bot, msg, args, config) => {
    if(!args[1]){
        msg.channel.send("You have to mention 2 users to clone roles (1st => 2nd)");
        return;
    }

    let q = 0, usr = [], roles1, roles2;

    msg.mentions.users.forEach(user => {
        usr[q] = user;
        q++
    })

    let error;

    msg.guild.fetchMember(usr[0]).then(user => usr[0] = user).catch( () => {error = true})
    msg.guild.fetchMember(usr[1]).then(user => usr[1] = user).catch( () => {error = true})

    if(error){
        msg.channel.send(`Missing permissions or user doesn't exist`); 
        return
    }

    roles1 = usr[0].roles
    roles2 = usr[1].roles

    roles1.forEach(role => {
        if(!roles2.includes(role.id)){
            usr[1].addRole(role.id)
        }
    })

    roles2.forEach(role => {
        if(!roles1.includes(role.id)){
            usr[1].removeRole(role.id)
        }
    })
}

module.exports.config = {
    name: "cloneroles",
	description: "Clones the roles from one user to another one!",
    usage: `<mentionID> <mentionID>`,
    category: `admin`,
	accessableby: "Server Admins and Moderators",
    aliases: ["cr"],
    perms: ['MANAGE_ROLES']
}