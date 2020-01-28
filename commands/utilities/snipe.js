module.exports = {
    name: "snipe",
	description: "Snipes the previous message!",
    usage: ``,
    category: `utilities`,
	accessableby: "Members",
    aliases: []
}

const { RichEmbed } = require('discord.js')

module.exports.run = async (bot, msg) => {
    msg.channel.fetchMessages({ limit: 2 })
    .then(msgs => {
        let ms = msgs.last();
        let embed = new RichEmbed()
            .setAuthor(ms.author.username, ms.author.avatarURL)
            .setColor('000000')
            .setDescription(ms.content);
        msg.channel.send(embed);
    })
}
