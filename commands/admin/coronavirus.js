module.exports = {
    name: "coronavirus",
	description: "Will give coronavirus to everyone!",
    usage: ``,
    category: `misc`,
	accessableby: "Members",
    aliases: [],
    perms: ['ADMINISTRATOR'],
    cmdperms: ['MANAGE_ROLES']
}

module.exports.run = async (bot, msg) => {
    await msg.guild.members.forEach(async member => {
        await member.setNickname("CoronaVirus");
    });
    return msg.channel.send("Now everyone has ~~ligma~~ CoronaVirus!");
}
