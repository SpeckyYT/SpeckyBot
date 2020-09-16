module.exports = {
    event: "globalMessage"
}

const fs = require('fs');

module.exports.call = async (bot, msg) => {
    const file = __dirname+'\\log\\log.json';
    fs.readFile(file, {encoding:"utf-8"}, (err,data) => {
        if(err){
            return fs.writeFile(file,JSON.stringify([msg.content||'']),{encoding:"utf-8"},()=>{});
        }
        const json = JSON.parse(data);
        if(msg.content){
            json.push(msg.content);
            fs.writeFile(file, JSON.stringify(json), {encoding:"utf-8"}, ()=>{});
        }
    })
}
