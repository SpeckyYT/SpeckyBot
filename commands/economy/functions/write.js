const { writeFile } = require('fs')

module.exports = async (economy) => {
    return await new Promise((resolve, reject) => {
        writeFile("db/userdata.json", JSON.stringify(economy,null,4), err => {
            if(err){
                reject(err);
            }else{
                resolve();
            }
        });
    })
}