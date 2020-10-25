module.exports = {
    name: "channelsunread",
    description: "Turns every channel in an unread one!",
    category: "admin",
    aliases: ["cur"],
    perms: ['ADMINISTRATOR']
}

module.exports.run = async (bot, msg) => {
    try{
        msg.delete();
    }catch{}
    msg.guild.channels.cache.forEach(async channel => {
        try{
            channel.send('New').then(msg => msg.delete());
        }catch{}
    })
}
