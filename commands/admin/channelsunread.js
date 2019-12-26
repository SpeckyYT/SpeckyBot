module.exports.run = async (bot, msg, args, config) => {
    msg.delete();
    msg.guild.channels.forEach(async channel => {
        try{
            channel.send('New').then(msg => msg.delete());
        }catch{}
    })
}

module.exports.config = {
    name: "channelsunread",
	description: "Turns every channel in an unread one!",
    usage: ``,
    category: `admin`,
	accessableby: "Server Admins and Moderators",
    aliases: ["cur"],
    perms: ['ADMINISTRATOR']
}