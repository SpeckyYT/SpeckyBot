var fs = require('fs');

module.exports = {
    startMessage: 'send me this in a direct message (DM):',
    defTime: 27000,
    name: 'writeDMSpecific',
    run: async function (channel, players, time, client, info) {
        const config = info.config
        const alternatives = config.tasks.say

        const word = alternatives[getRandomInt(alternatives.length)].toLowerCase()
        await channel.send(`**${word}**`)

        //making a bunch of collectors
        let collectors = []
        for(let player of players){
            await player.createDM()
            let dmCollector = player.dmChannel.awaitMessages(() => true, { max: 1, time: time })
            collectors.push(dmCollector)
        }

        //when time is up
        await sleep(time)
        if (config.opposite_day) await channel.send('Alright time\'s up!')
        else await channel.send('Simon says time\'s up!')

        await Promise.all(collectors)
        let messages = []

        for(let collected of collectors){
            let rCollected = await collected
            messages = messages.concat(rCollected.array())
        }

        let out = []
        let outIndex = []
        //check each player to see if they are out
        players.forEach((player, i) => {
            //check each message
            let sentCorrectMessage = false
            for (const message of messages) {
                if (message.author == player && message.content.toLowerCase().includes(word)) {
                    //if simon didnt say, the player is out
                    if (!info.simonSaid) {
                        out.push(player)
                        outIndex.push(i)
                    } else {
                        sentCorrectMessage = true
                    }
                    break
                }
            }
            if (info.simonSaid && !sentCorrectMessage) {
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

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}