const { readdirSync } = require("fs")

module.exports = (bot) => {
    delete require.cache;
    ["owner", "admin", "utilities", "games", "misc", "music", "sfw", "nsfw", "images", "private", "custom"].forEach(async dir => {
        try{
            let commands = readdirSync(`./commands/${dir}/`).filter(d => d.endsWith('.js'));
            commands.forEach(async file => {
                try{
                    let pull = require(`../commands/${dir}/${file}`);
                    if(!pull.name) throw {message: error = "Name of the command not found!".toUpperCase()};
                    bot.commands.set(pull.name, pull);
                    if (pull.aliases) pull.aliases.forEach(a => bot.aliases.set(a, pull.name));
                    bot.log(`${dir}     \t|\t${file}`.debug);
                }catch(err){
                    bot.log(`${dir}     \t|\t${file} ERROR!`.error);
                    bot.log(err.message.error);
                }
            })
        }catch(err){bot.log(`ERROR WHILE LOADING ${dir.toUpperCase()} FOLDER!`)}
    })
    bot.log();
};
