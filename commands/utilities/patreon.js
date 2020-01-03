const { RichEmbed } = require('discord.js')

module.exports.run = async (bot, msg) => {
    const embed = new RichEmbed()
        .setColor("#FF00AA")
        .setAuthor('Patreon Page!')
        .setDescription(`[**Patreon**](https://patreon.com/SpeckyBot)`)
        .addField(`Patreons:`, `*Nobody... but you can be this first!*`)
	msg.channel.send(embed);
}

module.exports.config = {
	name: "patreon",
	description: "Do you want to add this bot to your server?",
    usage: ``,
    category: `utilities`,
	accessableby: "Members",
    aliases: ["patr","patreo"]
}