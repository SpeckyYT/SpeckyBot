// example of a simple minigame

module.exports = {
    startMessage: 'react to this message!',
    defTime: 20000,
    name: 'react',
    run: async function (channel, players, time, bot, info) {


        let allReactions = info.startMessage.awaitReactions(() => true, {
            time: time
        })
        await bot.sleep(time - 1000)
        // when time is up
        if (info.settings.opposite_day) await channel.send('Alright time\'s up!')
        else await channel.send('Simon says time\'s up!')
        await bot.sleep(1000)
        allReactions = await allReactions
        allReactions = allReactions.array()

        let allUsers = []
        for(const reaction of allReactions){
            const { users } = await reaction.fetch();
            allUsers = allUsers.concat(users.cache.array())
        }

        // console.log(allUsers.map(user => user.name))

        const out = []
        const outIndex = []
        // check each player to see if they are out
        players.forEach((player, i) => {
            // check each message
            let reacted = false

            if (allUsers.includes(player)) {
                // if simon didnt say, the player is out
                if (!info.simonSaid) {
                    out.push(player)
                    outIndex.push(i)
                } else {
                    reacted = true
                }

            }

            if (info.simonSaid && !reacted) {
                out.push(player)
                outIndex.push(i)
            }
        })
        const newPlayers = players.filter( ( el ) => !out.includes( el ) )
        return({
            playersOut: out,
            playersLeft: newPlayers,
            settingsOut: info.settings
        })
    }
}
