const { readdirSync } = require("fs")
var boot = false


module.exports = (bot) => {
    var load = dirs => {
        var commands = readdirSync(`./commands/${dirs}/`).filter(d => d.endsWith('.js'));
        for (let file of commands) {
            if(boot){
                try{
                    delete require.cache[require.resolve(`../commands/${dirs}/${file}`)];
                }catch{}
            }
            try{
                let pull = require(`../commands/${dirs}/${file}`);
                bot.commands.set(pull.config.name, pull);
                if (pull.config.aliases) pull.config.aliases.forEach(a => bot.aliases.set(a, pull.config.name));
                console.log(`${dirs}     \t|\t${file}`);
            }catch{console.log(`${dirs}     \t|\t${file} ERROR!`); console.error}
        }
    }
    ["owner", "admin", "utilities", "external", "games", "misc", "music", "private", "custom"].forEach(x => load(x));
    boot = true;
    console.log();
};
