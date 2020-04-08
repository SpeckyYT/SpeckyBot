module.exports = (bot) => {
    bot.findSnowflake = (snowflake) => {
        let user = bot.users.get(snowflake);
        let guild = bot.guilds.get(snowflake);
        let emoji = bot.emojis.get(snowflake);
        let channel = bot.channels.get(snowflake);

        let res = null;
        
        [user,guild,emoji,channel].reverse().some(item => {
            if(item){
                res = item;
            }
        })

        return res;
    }
}
