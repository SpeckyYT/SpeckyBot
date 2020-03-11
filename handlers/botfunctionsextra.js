const { RichEmbed } = require('discord.js');

module.exports = async (bot) => {
    bot.embed = () => {
        return new RichEmbed()
        .setColor(bot.config.color)
        .setThumbnail(bot.user.avatarURL)
        .setTimestamp(new Date())
        .setAuthor(bot.user.username, bot.user.avatarURL, "https://github.com/SpeckyYT/SpeckyBot");
    }
}
