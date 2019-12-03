const { readdirSync } = require("fs")
var boot = 0
var error = 0

module.exports = (bot) => {
    var load = dirs => {
        var commands = readdirSync(`./commands/${dirs}/`).filter(d => d.endsWith('.js'));
        for (let file of commands) {
            error = 0;
            if(boot){
                try{
                    delete require.cache[require.resolve(`../commands/${dirs}/${file}`)];
                }catch{error = 1}
            }
            if(!error){
                let pull = require(`../commands/${dirs}/${file}`);
                bot.commands.set(pull.config.name, pull);
                if (pull.config.aliases) pull.config.aliases.forEach(a => bot.aliases.set(a, pull.config.name));
                console.log(`${dirs} | ${file}`);
            }
        }
    }
    ["admin", "custom", "external", "games", "misc", "music", "owner", "utilities","private"].forEach(x => load(x));
    boot = 1
    console.log();
};