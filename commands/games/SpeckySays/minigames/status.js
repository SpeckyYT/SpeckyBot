var fs = require('fs')

module.exports = {
    startMessage: 'change your status to:',
    defTime: 10000,
    name: 'status',
    run: async function (channel, players, time, client, info) {
        const config = info.config
        const alternatives = config.tasks.status

        const status = alternatives[getRandomInt(alternatives.length)]
        
        await channel.send(`**${status.replace('dnd', 'do not disturb').replace('offline', 'invisible')}**`)
        
        //when time is up
        await sleep(time)
        if (config.opposite_day) await channel.send('Alright time\'s up!')
        else await channel.send('Simon says time\'s up!')
        

        
        let out = []
        let outIndex = []
        //check each player to see if they are out
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
        let newPlayers = players.filter( ( el ) => !out.includes( el ) )
        return ({
            playersOut: out,
            playersLeft: newPlayers,
            configOut: config
        })
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

