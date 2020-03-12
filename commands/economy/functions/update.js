const { readFile } = require('fs')

module.exports = async (bot) => {
    return await new Promise((resolve,reject) => {
        readFile("db/userdata.json", "utf8", (err,data) => {
            if(err){
                reject(err);
            }else{
                resolve(bot.economy = JSON.parse(data));
            }
        })
    })
}