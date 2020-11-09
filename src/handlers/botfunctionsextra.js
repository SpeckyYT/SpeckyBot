const { MessageEmbed } = require('discord.js');

module.exports = async (bot) => {
    bot.embed = () => {
        return new MessageEmbed()
        .setColor(bot.config.color)
        .setThumbnail(bot.user.displayAvatarURL({format:'png'}))
        .setTimestamp(new Date())
        .setAuthor(bot.user.username, bot.user.displayAvatarURL(), "https://github.com/SpeckyYT/SpeckyBot");
    }
}
