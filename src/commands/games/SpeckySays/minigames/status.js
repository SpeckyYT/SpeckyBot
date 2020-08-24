module.exports = {
    startMessage: 'change your status to:',
    defTime: 10000,
    name: 'status',
    run: async function (channel, players, time, bot, info) {
        const settings = info.settings
        const alternatives = settings.tasks.status

        const status = alternatives.pick();

        await channel.send(`**${status.replace('dnd', 'do not disturb').replace('offline', 'invisible')}**`)

        // when time is up
        await bot.sleep(time)
        if (settings.opposite_day) await channel.send('Alright time\'s up!')
        else await channel.send('Simon says time\'s up!')



        const out = []
        const outIndex = []
        // check each player to see if they are out
        players.forEach((player, i) => {

            if(player.presence.status == status){
                if(!info.simonSaid){
                    out.push(player)
                    outIndex.push(i)
                }
            } else {
                if(info.simonSaid){
                    out.push(player)
                    outIndex.push(i)
                }
            }
        })
        const newPlayers = players.filter( ( el ) => !out.includes( el ) )
        return ({
            playersOut: out,
            playersLeft: newPlayers,
            settingsOut: settings
        })
    }
}
