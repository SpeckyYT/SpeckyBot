module.exports = {
    name: "whohasrole",
    description: "Returns all users that has this role!",
    usage: "[roleID]",
    category: "utilities",
    aliases: ["whr"]
}

module.exports.run = async (bot, msg) => {
    const role = msg.guild.roles.cache.get(msg.Args[0])

    if(role){
        const membs = role.members.map(member => member.toString())
        const embed = bot.membed()
        .setTitle(role.name)
        .setDescription(membs.join("\n"))
        .setColor(role.hexColor);

        return msg.channel.send(embed)
    }else{
        return bot.cmdError("ID is not a valid snowflake")
    }
}
