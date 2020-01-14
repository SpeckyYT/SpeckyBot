const { readdirSync } = require("fs")

module.exports = async (bot) => {
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
                    console.log(`${dir}   \t|\t${file}`);
                }catch(err){
                    console.log(`${dir}   \t|\t${file} ERROR!`)
                    console.log(err.message);
                }
            })
        }catch(err){console.log(`ERROR WHILE LOADING ${dir.toUpperCase()} FOLDER!`)}
    };
    ["client", "custom", "guild","private"].forEach(x => load(x));
    console.log();
};
