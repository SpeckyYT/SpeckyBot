module.exports = (bot) => {
    bot.findSnowflake = (snowflake) => {
        return  bot.users.get(snowflake) ||
                bot.channels.get(snowflake) ||
                bot.guilds.get(snowflake) ||
                bot.emojis.get(snowflake);
    }

    bot.snowflake = (input) => {
        if(!input){
            return require('node-snowflake').Snowflake.nextId();
        }else{
            return require('discord.js').SnowflakeUtil.deconstruct(input);
        }
    }
}
