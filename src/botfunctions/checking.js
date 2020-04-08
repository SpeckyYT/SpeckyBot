module.exports = (bot) => {
    bot.checkOwner = (id) => {
        return bot.config.owner.includes(id);
    }
}
