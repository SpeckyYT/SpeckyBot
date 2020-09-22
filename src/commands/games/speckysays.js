module.exports = {
    name: "speckysays",
    description: "Users have to complete the challenges in order to survive!\nThanks to **Mantevian / Manteex** and **Spu7Nix / SputNix** for this awesome module!\nhttps://github.com/Mantevian/simonsaysbot",
    usage: `#[channel] [start time in seconds]`,
    category: "games",
    cooldown: 30000,
    aliases: ["simonsays", "simon"],
    perms: ["MANAGE_MESSAGES"]
}

const { MessageEmbed } = require('discord.js');
const { join } = require('path');
const { runGame } = require(join(__dirname,'SpeckySays','game'));

module.exports.run = async (bot, msg) => {
    const { args } = msg;
    let channel = msg.mentions.channels.first()

    let time;

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
        return bot.cmdError('The time must be an integer of seconds');
    }

    if (channel != msg.channel) {
        msg.channel.send(`Starting game in ${channel}!`);
    }

    // collect players
    const startembed = new MessageEmbed().setTitle("REACT TO THIS MESSAGE WITH 🎲 TO JOIN SIMON SAYS!")
    .setDescription(`Hosted by ${msg.author}`)
    .setColor(msg.member.displayColor)
    .setFooter(`The game will start in ${Math.floor(time / 1000)} seconds.`)
    channel.send(startembed).then(async (msg) => {
        msg.react('🎲')

        const collected = await msg.awaitReactions(() => true, {time: time})

        let players = []
        for (const reaction of collected.array()) {
            if(reaction.emoji.name == '🎲'){
                const { users } = await reaction.fetch();
                players = players.concat(users.array())
            }
        }
        players = players.filter(player => !player.bot)

        if(!players.length) return bot.cmdError('**Game canceled!** Not enough players!');

        channel.send(
            `The game is starting! Players: ${players.join(', ')}`,
            new MessageEmbed()
            .setTitle('**Only follow my commands if it starts with "Simon says". \n If you fail, you are out of the game!**')
            .setColor('#77ECF2')
        )

        if(time > 30000 || players.length > 5){
            await bot.sleep(10000)
        } else {
            await bot.sleep(5000)
        }

        msg.delete()
        return runGame(channel, players, bot);
        // make game mechanics in game.js
    })
}
