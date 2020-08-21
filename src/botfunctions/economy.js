const { readFile, writeFile } = require('fs');

module.exports = (bot) => {
    bot.parseBet = (author,bet,min) => {
        const { money } = bot.economy[author.id];

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
                return bot.cmdError(`You only have ${bot.economy[author.id].money}₪ in the bank.`);
            case "0":
                return bot.cmdError(`Minimum bet is ${min == undefined ? 100 : min}`);
            case false:
                return bot.cmdError("Bet it not a Number")
            default:
                return false;
        }
    }

    bot.economyRead = async (author) => {
        return await new Promise((resolve,reject) => {
            readFile("../db/userdata.json", "utf8", async (err,data) => {
                if(err){
                    reject(err);
                }else{
                    bot.economy = JSON.parse(data);
                    author = author.author || author;
                    author = author.id || author;
                    if(author){
                        await bot.economySummon(author);
                        resolve();
                    }
                }
            })
        })
    }

    bot.economySummon = async (user) => {
        if(!bot.economy) return;

        if(user){
            user = user.user || user;
            user = user.id || user;

            let changes = false;

            if (!bot.economy[user]) {
                bot.economy[user] = {};
                changes = true;
            }
            if (!bot.economy[user].lastDaily) {
                bot.economy[user].lastDaily = "";
                changes = true;
            }
            if (bot.economy[user].money === null) {
                bot.economy[user].money = 0;
                changes = true;
            }
            if (!bot.economy[user].money && bot.economy[user].money != 0) {
                bot.economy[user].money = 1000;
                changes = true;
            }
            if(changes){
                await bot.economyWrite(bot.economy);
            }
        }
    }

    bot.economyWrite = async () => {
        if(!bot.economy) return;

        return await new Promise((resolve, reject) => {
            writeFile("../db/userdata.json", JSON.stringify(bot.economy,null,4), (err) => {
                if(err){
                    reject(err);
                }else{
                    resolve();
                }
            })
        })
    }
}
