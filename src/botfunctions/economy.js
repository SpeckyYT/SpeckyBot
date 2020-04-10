const { readFile, writeFile } = require('fs');

module.exports = (bot) => {
    bot.parseBet = (economy,author,bet,min) => {
        let { money } = economy[author.id];

        if(!min){
            min = 100
        }

        let nbet = Number(bet);

        if(nbet > money){
            return 0;
        }else if(nbet < (min ? min : 100)){
            return "0";
        }else if(bet === "all"){
            return money;
        }else if(isNaN(nbet)){
            return false;
        }else{
            return nbet;
        }
    }

    bot.economyRead = async (bot,author) => {
        return await new Promise((resolve,reject) => {
            readFile("../db/userdata.json", "utf8", async (err,data) => {
                if(err){
                    reject(err);
                }else{
                    bot.economy = JSON.parse(data);
                    author = author.author || author;
                    author = author.id || author;
                    if(author){
                        await bot.economySummon(bot, author);
                        resolve();
                    }
                }
            })
        })
    }

    bot.economySummon = async (bot, user) => {
        if(!bot) return;
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

    bot.economyWrite = async (economy) => {
        return await new Promise((resolve, reject) => {
            economy = economy.economy || economy;
            writeFile("../db/userdata.json", JSON.stringify(economy,null,4), (err) => {
                if(err){
                    reject(err);
                }else{
                    resolve();
                }
            })
        })
    }
}
