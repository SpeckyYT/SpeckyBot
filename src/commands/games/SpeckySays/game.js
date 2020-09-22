const { MessageEmbed } = require('discord.js');
const { readdirSync } = require('fs');
const { join } = require('path');
const config = require(join(__dirname,'settings'));

module.exports.runGame = async (channel, players_, bot) => {
    bot.minigames = Array.isArray(bot.minigames) ? bot.minigames : [];

    const gameFiles = readdirSync(join(__dirname,'minigames')).filter(file => file.match(bot.supportedFiles))

    for (const file of gameFiles) {
        const game = require(join(__dirname,"minigames",file));
        if(bot.minigames.length){
            bot.minigames.some((val,ind,arr) => {
                if(val.startMessage == game.startMessage){
                    bot.minigames[ind] = game;
                    return true;
                }
                if(ind+1 >= arr.length){
                    bot.minigames.push(game);
                    return false;
                }
            })
        }else{
            bot.minigames.push(game);
        }
    }

    let players = players_, time = 1, winners, gameOn, prematurelyEnd;
    if(players_.length < 1){
        prematurelyEnd = true
        gameOn = false
    }else{
        prematurelyEnd = false
        gameOn = true
    }
    let rounds = 1
    let lastGame = null
    // example of how to start a game
    let settings = require(join(__dirname,'settings'));

    await (async function gameLoop(){
        // chooses a random minigame
        const enabledGames = [...bot.minigames].filter((game) => !(game.name == 'oppositeDay' && rounds < 5));
        if(enabledGames.length == 0) return bot.cmdError("You need to have at least one game enabled to play. Probably the bot wasn't able to load any");
        let currentGame = enabledGames.pick();
        while(currentGame == lastGame) currentGame = enabledGames.pick();

        // picks a random start of startmessage
        let start;
        if (currentGame.name == 'oppositeDay') {
            start = {
                string: settings.opposite_day ? 'Good morning,' : 'Simon says',
                real: true
            }
        } else if(rounds < 3){
            start = {
                string: 'Simon says',
                real: true
            }
        } else {
            start = {
                string: 'Simon says',
                real: config.opposite_day ^ [0,0,1,1,1].pick()
            }
        }

        const actualTime = (time * currentGame.defTime).clamp(5000, 15000)
        // sends startmessage
        const startMessage = await channel.send(`**${start.string} ${currentGame.startMessage.toLowerCase()}** *(You have ${Math.floor(actualTime / 1000)} seconds)*`)
        // runs the game

        const res = await currentGame.run(channel, players, actualTime, bot, {
            simonSaid: start.real,
            startMessage: startMessage,
            settings: settings
        })

        let { playersOut } = res;
        const { playersLeft, settingsOut } = res;

        settings = settingsOut

        await bot.sleep(1000)
        playersOut = [...new Set(playersOut)]
        // say whos out
        const embed = new MessageEmbed()
        if (playersOut.length > 0) {
            embed.setDescription(`${playersOut.join(', ')} ${playersOut.length > 1 ? "are" : "is"} out!`)
            .setColor(`#FF230F`)
        } else {
            embed.setTitle('Good job! Nobody fell out!')
            .setColor(`#33CC14`)
        }

        channel.send(embed)
        await bot.sleep(1000)

        if (playersLeft.length < 1) {
            winners = playersOut
            gameOn = false
            return;
        }
        time *= 0.93;
        players = playersLeft;
        rounds++;
        lastGame = currentGame;
        if(gameOn) return gameLoop();
    })();

    if(!prematurelyEnd){
        const embed = new MessageEmbed()
        .setTitle('The game has ended!')
        .setDescription(`${winners.join(', ')} won with ${rounds} point${rounds !== 1 ? 's' : ''}! GG!`)
        .setColor('#FFBE11');
        return channel.send(embed);
    }
}
