const { readdirSync } = require("fs")

module.exports = async (bot) => {
    ["client", "custom", "guild","private"].forEach(async dir => {    
        try{
            const events = readdirSync(`./events/${dir}/`).filter(d => d.endsWith('.js'));
            events.forEach(async file => {
                try{
                    const evt = require(`../events/${dir}/${file}`);
                    let eName = evt.event;
                    if(!eName) throw {message: error = "Event not found!".toUpperCase()};
                    bot.on(eName, evt.call.bind(null, bot));
                    bot.log(`${dir}   \t|\t${file}`.debug);
                }catch(err){
                    bot.log(`${dir}   \t|\t${file} ERROR!`.error)
                    bot.log(err.message.error);
                }
            })
        }catch(err){bot.log(`ERROR WHILE LOADING ${dir.toUpperCase()} FOLDER!`)}
    })
    bot.log();
};
