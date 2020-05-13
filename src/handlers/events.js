const { readdirSync, lstatSync } = require("fs");
const { join } = require('path');

module.exports = async (bot) => {
    bot.removeAllListeners();
    const getDirectories = source => readdirSync(source).map(name => join(source, name)).filter(source => lstatSync(source).isDirectory());
    getDirectories('./events/')
    .forEach(async edir => {    
        try{
            readdirSync(`./${edir}/`)
            .filter(d => d.match(bot.supportedFiles))
            .forEach(async file => {
                const dir = edir.slice(1+Math.max(edir.indexOf('/'),edir.indexOf('\\')));
                try{
                    const evt = bot.require(`../${edir}/${file}`);
                    let eName = evt.event;
                    if(!eName) throw {message: error = "Event not found!".toUpperCase()};
                    let calltype = evt.type || "on";
                    bot[calltype](eName, bot.getFunction(evt).bind(null, bot));
                    bot.log(`${dir}   \t|\t${file}`.debug);
                }catch(err){
                    bot.log(`${dir}   \t|\t${file} ERROR!`.error)
                    bot.log(err.message.error);
                }
            })
        }catch(err){bot.log(`ERROR WHILE LOADING ${edir.toUpperCase()} FOLDER!`)}
    })
    bot.log();
};
