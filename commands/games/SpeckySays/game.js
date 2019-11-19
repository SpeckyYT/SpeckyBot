let randomStart = require('./randomStart.js')
var discord = require('discord.js')
var fs = require('fs')

module.exports.runGame = async function (channel, players_, client) {
    let players = players_
    let time = 1
    let winners
    let gameOn = true
    let rounds = 1
    let lastGame = null
    //example of how to start a game
    let config = JSON.parse(fs.readFileSync(`./guilds/${channel.guild.id}.json`)); //for this game only

    while (gameOn) {
        
        //chooses a random minigame
        
        let enabledGames = []
        for(let game of client.minigames){
            if(config.minigames[game.name]){
                if(game.name == 'oppositeDay' && rounds < 4) continue
                enabledGames.push(game)
            }
        }
        if(enabledGames.length == 0){
            channel.send('You need to have at least one game enabled to play. Enable/disable with the config command.')
            return
        }
        let currentGame  = enabledGames[getRandomInt(enabledGames.length)]
        
        while(currentGame == lastGame){
            currentGame = enabledGames[getRandomInt(enabledGames.length)]
        }
        
        //picks a random start of startmessage (67% chance of getting "Simon says")
        let start
        if (currentGame.name == 'oppositeDay') {
            start = {
                string: config.opposite_day ? 'Good morning,' : 'Simon says',
                real: true
            }
        } else if(rounds < 3){
            start = {
                string: 'Simon says',
                real: true
            } 
        } else {
            start = randomStart(channel.guild.id, config)
        }
        let actualTime = (time * currentGame.defTime).clamp(5000, 15000)
        //sends startmessage
        const startMessage = await channel.send(`**${start.string} ${currentGame.startMessage.toLowerCase()}** *(You have ${Math.floor(actualTime / 1000)} seconds)*`)
        //runs the game
        console.log(currentGame.name)
        
        let {
            playersOut,
            playersLeft,
            configOut
        } = await currentGame.run(channel, players, actualTime, client, {
            simonSaid: start.real,
            startMessage: startMessage,
            config: config
        })
        config = configOut

        await sleep(1000)
        playersOut = [...new Set(playersOut)]
        //say whos out
        var embed = new discord.RichEmbed()
        if (playersOut.length > 0) {
            embed.setDescription(`${playersOut.join(', ')} ${playersOut.length > 1 ? "are" : "is"} out!`)
                .setColor(`#FF230F`)
        } else {
            embed.setTitle('Good job! Nobody fell out!')
                .setColor(`#33CC14`)
        }

        channel.send(embed)
        console.log('Players still in: ' + playersLeft.map(user => user.username).join(', '))
        await sleep(1000)
        

        if (playersLeft.length == 0) {
            winners = playersOut
            gameOn = false
            break
        }
        time *= 0.94
        players = playersLeft
        rounds++
        lastGame = currentGame
    }

    var embed = new discord.RichEmbed()
        .setTitle('The game has ended!')
        .setDescription(`${winners.join(', ')} won with ${rounds} points! GG!`)
        .setColor('#FFBE11')
    channel.send(embed)
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

Number.prototype.clamp = function (min, max) { 
    return Math.min(Math.max(this, min), max);
};