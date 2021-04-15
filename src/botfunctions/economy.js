const db = require('quick.db');
const economy = new db.table('economy');

module.exports = (bot) => {
    bot.parseBet = (author,bet,min) => {
        const money = economy.get(`${author.id}.money`);

        if(isNaN(min)) min = 100

        const nbet = Number(bet);

        if(nbet > money) return 0;
        else if(nbet < (min ? min : 100)) return "0";
        else if(bet === "all") return money;
        else if(isNaN(nbet)) return false;
        else return nbet;
    }

    bot.resolveBet = (author,parsedBet,min) => {
        switch(parsedBet){
            case 0:
                return bot.cmdError(`You only have ${economy.get(`${author.id}.money`)}₪ in the bank.`);
            case "0":
                return bot.cmdError(`Minimum bet is ${isNaN(min) ? 100 : min}`);
            case false:
                return bot.cmdError("Bet it not a Number");
            default:
                return false;
        }
    }

    bot.economySummon = (user) => {
        const id = user.author ? user.author.id : user.id || user
        if(!economy.has(id)) economy.set(`${id}.money`,1000);
    }
}
