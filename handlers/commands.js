const { readdirSync } = require("fs")

module.exports = (bot) => {
    console.log("\n\n\nLoading commands!");
    const load = dirs => {
        const commands = readdirSync(`./commands/${dirs}/`).filter(d => d.endsWith('.js'));
        console.log();
        for (let file of commands) {
            let pull = require(`../commands/${dirs}/${file}`);
            bot.commands.set(pull.config.name, pull);
            if (pull.config.aliases) pull.config.aliases.forEach(a => bot.aliases.set(a, pull.config.name));
            console.log(`${dirs} | ${file}`);
        };
    };
    ["admin", "games", "misc", "music", "owner", "utilities"].forEach(x => load(x));
    console.log();
};