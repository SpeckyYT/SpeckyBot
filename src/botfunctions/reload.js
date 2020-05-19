module.exports = (bot) => {
    bot.reload = () => {
        const begin = new Date();

        require('../handlers/botloader')(bot);
        
        const end = new Date();
        const time = end - begin;

        return {time}
    }
}
