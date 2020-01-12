const { readdirSync } = require("fs")

module.exports = (bot) => {
    delete require.cache;
    let load = dirs => {
        let commands = readdirSync(`./commands/${dirs}/`).filter(d => d.endsWith('.js'));
        commands.forEach(async file => {
            try{
                let pull = require(`../commands/${dirs}/${file}`);
                bot.commands.set(pull.config.name, pull);
                if (pull.config.aliases) pull.config.aliases.forEach(a => bot.aliases.set(a, pull.config.name));
                console.log(`${dirs}     \t|\t${file}`);
            }catch(err){
                console.log(`${dirs}     \t|\t${file} ERROR!`);
                console.log(err);
            }
        })
    }
    ["owner", "admin", "utilities", "external", "games", "misc", "music", "sfw", "nsfw", "images", "private", "custom"].forEach(x => load(x));
    console.log();
};
