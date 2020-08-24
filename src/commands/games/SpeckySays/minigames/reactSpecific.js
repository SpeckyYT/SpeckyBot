module.exports = {
    startMessage: 'do this:',
    defTime: 25000,
    name: 'reactSpecific',
    run: async function (channel, players, time, bot, info) {
        const settings = info.settings
        const alternatives = settings.tasks.react

        const emoji = alternatives.pick();
        const startMessage = await channel.send(`React to this message with this emoji: ${emoji}`)

        let allReactions = startMessage.awaitReactions(() => true, {
            time: time
        })
        await bot.sleep(time - 1000)
        // when time is up
        if (settings.opposite_day) await channel.send('Alright time\'s up!')
        else await channel.send('Simon says time\'s up!')
        await bot.sleep(1000)
        allReactions = await allReactions
        allReactions = allReactions.array()

        let allUsers = []
        for (const reaction of allReactions) {

            if (reaction.emoji.toString() === emoji) {
                const users = await reaction.fetchUsers()
                allUsers = allUsers.concat(users.array())
            }
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
        return ({
            playersOut: out,
            playersLeft: newPlayers,
            settingsOut: settings
        })
    }
}
