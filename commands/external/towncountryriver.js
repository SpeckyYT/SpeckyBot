const { RichEmbed } = require('discord.js')
const { runGame } = require('./TCR/game');

module.exports.run = async (bot, msg, args, config) => {

    let channel = msg.mentions.channels.first()

    var time;

    if (!channel) {
        channel = msg.channel;
        time = args[0] ? parseInt(args[0], 10) * 1000 : 30000
    } else {
        time = args[1] ? parseInt(args[1], 10) * 1000 : 30000
        if(!time){
            time = args[0] ? parseInt(args[0], 10) * 1000 : 30000
        }
    }

    if (!time){
        msg.reply('the time must be an integer of seconds.')
        return
    }

    if (channel != msg.channel) {
        msg.channel.send(`Starting game in ${channel}!`)
    }

    //collect players
    let startembed = new RichEmbed().setTitle("REACT TO THIS MESSAGE WITH 🎲 TO JOIN TOWN COUNTRY RIVER!")
    .setDescription(`Hosted by <@${msg.author.id}>`)
    .setColor(msg.member.displayColor)
    .setFooter(`The game will start in ${Math.floor(time / 1000)} seconds.`)
    channel.send(startembed).then(async (msg) => {
        msg.react('🎲')
        
        let collected = await msg.awaitReactions(() => true, {
            time: time
        })
        
        let players = []
        for (let reaction of collected.array()) {
            if(reaction.emoji.name == '🎲'){
                let users = await reaction.fetchUsers()
                players = players.concat(users.array())
            }
        }
        players = players.filter(player => !player.bot)

        if(players.length < 1 || players.length == null) return channel.send('**Game canceled!** Not enough players!');

        channel.send(`The game is starting! Players: ${players.join(', ')}`)
        let explanationEmbed = new RichEmbed()
            .setTitle('**Think fast! You have less than 10 seconds to think of a word that starts with the given letter in the given time!**')
            .setColor('#77ecf2')
        channel.send(explanationEmbed)

        if(time > 30000 || players.length > 5){
            await sleep(10000)
        } else {
            await sleep(5000)
        }

        runGame(channel, players, bot)
        msg.delete()
        //make game mechanics in game.js
    })
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports.config = {
    name: "towncountryriver",
	description: "You have to type a word with the starting letter that the bot gives!\nThanks to Mantevian / Manteex and Spu7Nix / SputNix for the base of this module!\nhttps://github.com/Mantevian/simonsaysbot",
    usage: `#[channel] [start time in seconds]`,
    category: `games`,
	accessableby: "Members",
    aliases: ["tcr"],
    perms: ["MANAGE_MESSAGES"]
}
