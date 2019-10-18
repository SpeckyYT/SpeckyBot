const { RichEmbed } = require('discord.js')

module.exports.run = async (bot, msg, args, owner, prefix) => {
    if(!(msg.author.id === owner)){
        msg.channel.send("You aren't my owner.");
        return;
    }
    let vmsg = '634813744890773512';
    msg.channel.fetchMessage(vmsg).then(ms => {
        let embed = new RichEmbed()
            .setColor('#000000')
            .setAuthor(`BombSpot`)
            .setThumbnail(msg.guild.imageURL)
            .setTimestamp()
            .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL);
        ms.channel.edit(embed);
    }
)};

module.exports.config = {
    name: "embed",
	description: "What about an embed?",
    usage: ``,
    category: `owner`,
	accessableby: "Bot Owner",
    aliases: ["emb"]
}