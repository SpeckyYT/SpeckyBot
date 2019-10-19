const { RichEmbed } = require('discord.js')

module.exports.run = async (bot, msg, args, owner, prefix) => {
    var quantity = 0;
    bot.users.forEach(user => {
        quantity++;
    })
    const embed = new RichEmbed()
        .setColor('#FF00AA')
        .setTitle(`${bot.user.username}`)
        .setThumbnail(bot.user.imageURL)
        .addBlankField()
        .addField(`Member Count:`, `${quantity}`)
        .addBlankField()
        .setTimestamp()
        .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL);
    msg.channel.send(embed);
};

module.exports.config = {
    name: "users",
	description: "How many people does this bot know?",
    usage: ``,
    category: `utilities`,
	accessableby: "Members",
    aliases: ["us"]
}