const { readdirSync } = require("fs")
var boot = false
var error = false

module.exports = (bot) => {
    var load = dirs => {
        var commands = readdirSync(`./commands/${dirs}/`).filter(d => d.endsWith('.js'));
        for (let file of commands) {
            error = false;
            if(boot){
                try{
                    delete require.cache[require.resolve(`../commands/${dirs}/${file}`)];
                }catch{error = true}
            }
            if(!error){
                let pull = require(`../commands/${dirs}/${file}`);
                bot.commands.set(pull.config.name, pull);
                if (pull.config.aliases) pull.config.aliases.forEach(a => bot.aliases.set(a, pull.config.name));
                console.log(`${dirs} | ${file}`);
            }
        }
    }
    ["owner", "admin", "custom", "utilities", "external", "games", "misc", "music", "private"].forEach(x => load(x));
    boot = true;
    console.log();
};
