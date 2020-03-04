module.exports = {
    name: "coronavirus",
    description: "Will give coronavirus to everyone!",
    usage: ``,
    category: `admin`,
    accessableby: "Server Admins and Moderators",
    aliases: [],
    perms: ['ADMINISTRATOR'],
    cmdperms: ['MANAGE_ROLES']
}

module.exports.run = async (bot, msg) => {
    await msg.guild.members.forEach(async member => {
        await member.setNickname("CoronaVirus").catch();
    });
    return msg.channel.send("Now everyone has ~~ligma~~ CoronaVirus!");
}
