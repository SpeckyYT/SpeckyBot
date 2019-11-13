const { RichEmbed } = require('discord.js')

module.exports.run = async (bot, msg, args, config) => {
    var quantity = 0;
    bot.guilds.forEach(server => {
        if(msg.author.id === config.owner && args[0] == `yes`) msg.channel.send(`${server.name} (${server.id})`);
        quantity++;
    })
    const embed = new RichEmbed()
        .setColor('#FF00AA')
        .setTitle(`${bot.user.username}`)
        .setThumbnail(bot.user.imageURL)
        .addBlankField()
        .addField(`Servers Count:`, `${quantity}`)
        .addBlankField()
        .setTimestamp()
        .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL);
    msg.channel.send(embed);
};

module.exports.config = {
    name: "guilds",
	description: "How many servers does this bot know?",
    usage: ``,
    category: `utilities`,
	accessableby: "Members",
    aliases: ["servers"]
}