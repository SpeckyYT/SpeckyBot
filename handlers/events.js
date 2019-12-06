const { readdirSync } = require("fs")

module.exports = (bot) => {
    const load = dirs => {    
        const events = readdirSync(`./events/${dirs}/`).filter(d => d.endsWith('.js'));
        for (let file of events) {
            const evt = require(`../events/${dirs}/${file}`);
            let eName = evt.config.event;
            bot.on(eName, evt.bind(null, bot));
            console.log(`${dirs} | ${file}`);
        };
    };
    ["client", "custom", "guild","private"].forEach(x => load(x));
    console.log();
};