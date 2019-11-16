const { RichEmbed } = require('discord.js')

module.exports.run = async (bot, msg, args, config) => {
    const embed = new RichEmbed()
        .setColor("#FF00AA")
		.setTitle('Links!')
        .setDescription(`[Official Discord Server](https://discord.gg/4EecFku)\n[Invite](https://discordapp.com/api/oauth2/authorize?client_id=398157933315227649&permissions=2147483135&scope=bot)\n[Support This Bot](https://patreon.com/SpeckyBot)`)
	msg.channel.send(embed);
}

module.exports.config = {
	name: "invite",
	description: "Do you want to add this bot to your server?",
    usage: ``,
    category: `utilities`,
	accessableby: "Members",
    aliases: ["inv","invit"]
}