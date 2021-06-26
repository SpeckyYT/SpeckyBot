module.exports = {
    name: "channelsunread",
    description: "Turns every channel in an unread one!",
    category: "admin",
    aliases: ["cur"],
    userPerms: 8n
}

module.exports.run = async (bot, msg) => {
    msg.guild.channels.cache
    .forEach(c =>
        c.send &&
        c.send('New')
        .then(msg => msg.delete())
        .catch(()=>{})
    )
}
