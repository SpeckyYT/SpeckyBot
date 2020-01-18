const { readdirSync } = require("fs")

module.exports = async (bot) => {
    bot.setMaxListeners(25)
    delete require.cache;
    bot.removeAllListeners();
    const load = dir => {    
        try{
            const events = readdirSync(`./events/${dir}/`).filter(d => d.endsWith('.js'));
            events.forEach(async file => {
                try{
                    const evt = require(`../events/${dir}/${file}`);
                    let eName = evt.config.event;
                    bot.on(eName, evt.bind(null, bot));
                    bot.log(`${dir}   \t|\t${file}`);
                }catch(err){
                    bot.log(`${dir}   \t|\t${file} ERROR!`)
                    bot.log(err.message);
                }
            })
        }catch(err){bot.log(`ERROR WHILE LOADING ${dir.toUpperCase()} FOLDER!`)}
    };
    ["client", "custom", "guild","private"].forEach(x => load(x));
    bot.log();
};
