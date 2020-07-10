module.exports = {
    event: "interval_5_min",
    call: (bot) => {
        const guild = bot.guilds.get('265505748413448193');
        if(!guild) return;

        Promise.all([
            guild.fetchBans(),
            guild.fetchInvites(),
            ...guild.emojis.partition(e => !e.animated)
        ])
        .then(inf => {
            const string = `│🌍${inf.map(v=>[v.size,v.length,v,0].find(w=>typeof w==='number')).join('-')}`;
            const channel = bot.channels.get('714465197032734760');
            if(!channel) return;
            if(channel.name !== string){
                channel.setName(string).catch(()=>{})
            }
        })
    }
}
