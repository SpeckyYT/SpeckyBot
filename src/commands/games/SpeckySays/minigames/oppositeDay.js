module.exports = {
    startMessage: 'it\'s a new day!',
    defTime: 20000,
    name: 'oppositeDay',
    run: async function (channel, players, time, bot, info) {
        const settings = info.settings

        if (!settings.opposite_day) await channel.send('Opposite day begins soon! Write **ok** in chat if you are ready!')
        else await channel.send('Opposite day has ended! Write **ok** if you are ready to go back to normal!')

        const collector = channel.createMessageCollector(() => true);

        let collected
        collector.on('end', collected_ => {
            collected = collected_
        });

        // when time is up
        await bot.sleep(time)

        if (!settings.opposite_day) await channel.send('Simon says time\'s up! We\'re ready to start the opposite day! \n **From now and until opposite day ends, do the opposite of what you would normally do to stay in the game!**')
        else await channel.send('Alright time\'s up! We\'ve ended the opposite day!')

        collector.stop()
        await bot.sleep(6000)
        const messages = collected.array()
        const out = []
        const outIndex = []
        // check each player to see if they are out
        players.forEach((player, i) => {
            // check each message
            let sentCorrectMessage = false
            for (const message of messages) {
                if (message.author == player && message.content.toLowerCase().includes("ok")) {
                    sentCorrectMessage = true
                    break
                }
            }
            if (!sentCorrectMessage) {
                out.push(player)
                outIndex.push(i)
            }
        })
        const newPlayers = players.filter( ( el ) => !out.includes( el ) )

        settings.opposite_day = !settings.opposite_day


        return ({
            playersOut: out,
            playersLeft: newPlayers,
            settingsOut: settings
        })
    }
}
