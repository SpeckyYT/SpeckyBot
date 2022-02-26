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
        if (role.members.size) {
            const membs = role.members.map(m => m.user)
            const embed = bot.membed()
            .setTitle(role.name)
            .setDescription(membs.join("\n"))
            .setColor(role.hexColor);

            return msg.channel.send(embed)
        } else {
            return bot.cmdError('No members have this role')
        }
    }else{
        return bot.cmdError("ID is not a valid snowflake")
    }
}
