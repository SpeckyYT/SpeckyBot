module.exports = {
	name: "invite",
	description: "Do you want to add this bot to your server?",
    usage: ``,
    category: `utilities`,
	accessableby: "Members",
    aliases: ["inv","invit"]
}

const { RichEmbed } = require('discord.js')

module.exports.run = async (bot, msg) => {
    if(!bot.link){
        await bot.generateInvite(2147483135).then(data => {
            bot.link = data;
        }).catch(()=>{})
    }
    
    const embed = new RichEmbed()
        .setColor("#FF00AA")
		.setTitle('Links!')
        .setDescription(`[SpeckyBot Discord Server](https://discord.gg/4EecFku)\n[Bot Invite](${bot.link})\n[Support This Bot](https://patreon.com/SpeckyBot)`)
	msg.channel.send(embed);
}
