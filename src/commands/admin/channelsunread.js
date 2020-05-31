module.exports = {
    name: "channelsunread",
    description: "Turns every channel in an unread one!",
    usage: ``,
    category: `admin`,
    accessableby: "Server Admins and Moderators",
    aliases: ["cur"],
    perms: ['ADMINISTRATOR']
}

module.exports.run = async (bot, msg) => {
    try{
        msg.delete();
    }catch{}
    msg.guild.channels.forEach(async channel => {
        try{
            channel.send('New').then(msg => msg.delete());
        }catch{}
    })
}
