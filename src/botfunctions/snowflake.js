module.exports = (bot) => {
    bot.snowflake = () => require('node-snowflake').Snowflake.nextId();
}
