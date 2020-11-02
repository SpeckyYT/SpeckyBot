module.exports = {
    name: "channelsunread",
    description: "Turns every channel in an unread one!",
    category: "admin",
    aliases: ["cur"],
    userPerms: ['ADMINISTRATOR']
}

module.exports.run = async (bot, msg) => {
    msg.delete().catch(()=>{});
    msg.guild.channels.cache.forEach(channel => {
        channel.send('New').then(msg => msg.delete()).catch(()=>{});
    })
}
