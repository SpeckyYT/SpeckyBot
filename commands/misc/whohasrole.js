const { RichEmbed } = require('discord.js')

module.exports.run = async (bot, msg) => {
    let role = msg.guild.roles.get(msg.Args[0])

    if(role){
        let membs = [];
        role.members.forEach(member => {
            membs.push(member.toString())
        })
        let embed = new RichEmbed()
        .setTitle(role.name)
        .setDescription(membs.join("\n"))
        .setColor(role.hexColor);

        msg.channel.send(embed)
    }else{
        return bot.cmdError("ID is not a valid snowflake")
    }
}

module.exports.config = {
    name: "whohasrole",
	description: "Returns all users that has this role!",
    usage: `[roleID]`,
    category: `misc`,
	accessableby: "Members",
    aliases: ["whr"]
}
