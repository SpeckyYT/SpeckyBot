module.exports = (bot) => {
    bot.findSnowflake = (snowflake) => {
        return  bot.users.get(snowflake) ||
                bot.channels.get(snowflake) ||
                bot.guilds.get(snowflake) ||
                bot.emojis.get(snowflake);
    }
}
