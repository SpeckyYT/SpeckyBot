const { readdirSync } = require("fs")

module.exports = (bot) => {
    delete require.cache;
    let load = dir => {
        try{
            let commands = readdirSync(`./commands/${dir}/`).filter(d => d.endsWith('.js'));
            commands.forEach(async file => {
                try{
                    let pull = require(`../commands/${dir}/${file}`);
                    bot.commands.set(pull.config.name, pull);
                    if (pull.config.aliases) pull.config.aliases.forEach(a => bot.aliases.set(a, pull.config.name));
                    bot.log(`${dir}     \t|\t${file}`.debug);
                }catch(err){
                    bot.log(`${dir}     \t|\t${file} ERROR!`.error);
                    bot.log(err.message.error);
                }
            })
        }catch(err){bot.log(`ERROR WHILE LOADING ${dir.toUpperCase()} FOLDER!`)}
    }
    ["owner", "admin", "utilities", "games", "misc", "music", "sfw", "nsfw", "images", "private", "custom"].forEach(x => load(x));
    bot.log();
};
