var fs = require('fs')

module.exports = {
    startMessage: 'don\'t write anything in chat!',
    defTime: 7000,
    name: 'dontWrite',
    run: async function (channel, players, time, client, info) {
        const collector = channel.createMessageCollector(() => true);

        const config = info.config

        let collected
        collector.on('end', collected_ => {
            collected = collected_
        });

        //when time is up
        await sleep(time)
        if (config.opposite_day) await channel.send('Alright time\'s up!')
        else await channel.send('Simon says time\'s up!')
        collector.stop()

        let messages = collected.array()
        let out = []
        let outIndex = []
        //check each player to see if they are out
        players.forEach((player, i) => {
            //check each message
            let sentMessage = false
            for (const message of messages) {
                if (message.author == player) {
                    //if simon didnt say, the player is out
                    if (info.simonSaid) {
                        out.push(player)
                        outIndex.push(i)
                    }
                    sentMessage = true
                    break
                }
            }
            if (!info.simonSaid && !sentMessage) {
                out.push(player)
                outIndex.push(i)
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