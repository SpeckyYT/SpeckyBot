var discord = require('discord.js')
var fs = require('fs')

module.exports.runGame = async function (channel, players_, bot) {
    const game = require(`./data/tcr`)

    let players = players_
    let time = 1
    let winners
    let gameOn
    let prematurelyEnd
    if(players_.length < 1){
        prematurelyEnd = true
        gameOn = false
    }else{
        prematurelyEnd = false
        gameOn = true
    }
    let rounds = 1
    let lastGame = null
    //example of how to start a game
    let settings = {
        "minigames":{
            "tcr":true
        }
    }

    while (gameOn) {
        
        //chooses a random minigame
        let currentGame  = game
        
        //picks a random start of startmessage (67% chance of getting "Simon says")
        let start = {
            string: 'Type',
            real: true
        }

        let actualTime = (time * currentGame.defTime).clamp(5000, 15000)
        //sends startmessage
        const startMessage = await channel.send(`**${start.string} ${currentGame.startMessage.toLowerCase()}** *(You have ${Math.floor(actualTime / 1000)} seconds)*`)
        //runs the game
        
        let {
            playersOut,
            playersLeft,
            settingsOut
        } = await currentGame.run(channel, players, actualTime, bot, {
            simonSaid: start.real,
            startMessage: startMessage,
            settings: settings
        })
        settings = settingsOut

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
        await sleep(1000)
        

        if (playersLeft.length < 1) {
            winners = playersOut
            gameOn = false
            break
        }
        time *= 0.93
        players = playersLeft
        rounds++
        lastGame = currentGame
    }

    if(!prematurelyEnd){
        var embed = new discord.RichEmbed()
            .setTitle('The game has ended!')
            .setDescription(`${winners.join(', ')} won with ${rounds} points! GG!`)
            .setColor('#FFBE11')
        channel.send(embed)
    }
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