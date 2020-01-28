module.exports = {
    name: "users",
	description: "How many people does this bot know?",
    usage: ``,
    category: `utilities`,
	accessableby: "Members",
    aliases: []
}

const { RichEmbed } = require('discord.js')

module.exports.run = async (bot, msg) => {
    const embed = new RichEmbed()
        .setColor('#FF00AA')
        .setTitle(`${bot.user.username}`)
        .setThumbnail(bot.user.imageURL)
        .addField(`Total Users Count:`, `${bot.users.size}`)
        .setTimestamp()
        .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL);
    msg.channel.send(embed);
}
