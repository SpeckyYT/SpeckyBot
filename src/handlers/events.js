const { readdirSync, lstatSync } = require("fs");
const { join } = require('path');

module.exports = async (bot) => {
    bot.removeAllListeners();
    const getDirectories = source => readdirSync(source).map(name => join(source, name)).filter(source => lstatSync(source).isDirectory());
    getDirectories('./events/')
    .map(d => d.slice(d.indexOf('\\')+1))
    .forEach(async dir => {    
        try{
            readdirSync(`./events/${dir}/`)
            .filter(d => d.match(bot.supportedFiles))
            .forEach(async file => {
                try{
                    const evt = bot.require(`../events/${dir}/${file}`);
                    let eName = evt.event;
                    if(!eName) throw {message: error = "Event not found!".toUpperCase()};
                    let calltype = evt.type || "on";
                    bot[calltype](eName, evt.call.bind(null, bot));
                    bot.log(`${dir}   \t|\t${file}`.debug);
                }catch(err){
                    bot.log(`${dir}   \t|\t${file} ERROR!`.error)
                    bot.log(err.message.error);
                }
            })
        }catch(err){bot.log(`ERROR WHILE LOADING ${dir.toUpperCase()} FOLDER!`)}
    })
    bot.log();
};
