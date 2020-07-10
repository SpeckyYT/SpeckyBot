module.exports = {
    event: "interval_5_min",
    call: (bot) => {
        const guild = bot.guilds.get('265505748413448193');
        if(!guild) return;

        guild.fetchBans()
        .then(beans => {
            const banS = `│🌍${beans.size}`;
            const channel = bot.channels.get('714465197032734760')
            if(!channel) return;
            if(channel.name !== banS){
                channel.setName(banS).catch(()=>{})
            }
        })
    }
}
