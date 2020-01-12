const { readdirSync } = require("fs")

module.exports = async (bot) => {
    delete require.cache;
    bot.removeAllListeners();
    const load = dirs => {    
        const events = readdirSync(`./events/${dirs}/`).filter(d => d.endsWith('.js'));
        events.forEach(async file => {
            try{
                const evt = require(`../events/${dirs}/${file}`);
                let eName = evt.config.event;
                bot.on(eName, evt.bind(null, bot));
                console.log(`${dirs}   \t|\t${file}`);
            }catch(err){
                console.log(`${dirs}   \t|\t${file} ERROR!`)
                console.log(err.message);
            }
        })
    };
    ["client", "custom", "guild","private"].forEach(x => load(x));
    console.log();
};
