const { readdirSync } = require("fs")
var boot = false;

module.exports = (bot) => {
    bot.removeAllListeners();
    const load = dirs => {    
        const events = readdirSync(`./events/${dirs}/`).filter(d => d.endsWith('.js'));
        for (let file of events) {
            if(boot){
                try{
                    delete require.cache[require.resolve(`../events/${dirs}/${file}`)];
                }catch{}
            }
            try{
                const evt = require(`../events/${dirs}/${file}`);
                let eName = evt.config.event;
                bot.on(eName, evt.bind(null, bot));
                console.log(`${dirs}\t|\t${file}`);
            }catch(err){
                console.log(`${dirs}\t|\t${file} ERROR!`)
                console.log(err.message);
            }
        };
    };
    ["client", "custom", "guild","private"].forEach(x => load(x));
    boot = true;
    console.log();
};
