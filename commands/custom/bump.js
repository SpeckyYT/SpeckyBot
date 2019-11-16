const { RichEmbed } = require("discord.js");
const Math = require('mathjs');

module.exports.run = async (bot, msg, args, config) => {
        let cEmbed = new RichEmbed()
        .setColor('#24B8B8')
        .setURL('https://disboard.org/server/265505748413448193')
        .setTitle(`**DISBOARD: The Public Server List**`)
        .setDescription(`<@${msg.author.id}>,\nBump succeeded :thumbsup:\nYou are now bump level ${Math.randomInt(1,250)} and you got the <@&605392884526612524> role!`)
        .setImage('https://cdn.discordapp.com/attachments/555484681135587338/599982089089187870/bot-command-image-bump.png')

        msg.channel.send(cEmbed);
}

module.exports.config = {
    name: "bump",
	description: "Bumps the server!",
    usage: ``,
    category: `misc`,
	accessableby: "Members",
    aliases: [""],
    servers: [265505748413448193]
}