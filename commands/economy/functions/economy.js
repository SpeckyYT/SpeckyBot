const { readFile } = require('fs');

module.exports.read = async (bot) => {
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

const { writeFile } = require('fs');

module.exports.write = async (economy) => {
    return await new Promise((resolve, reject) => {
        writeFile("db/userdata.json", JSON.stringify(economy,null,4), err => {
            if(err){
                reject(err);
            }else{
                resolve();
            }
        })
    })
}