module.exports = {
    name: "games",
    description: "What's the most played game in this server?",
    category: "utilities",
    aliases: ["game"]
}

const { RichEmbed } = require('discord.js')

module.exports.run = async (bot, msg) => {
    const games = [];

    await msg.guild.members.forEach(member => {
        if(!member.user.bot){
            if(member.presence.game){
                if(!games[String(member.presence.game.name)]){
                    games[String(member.presence.game.name)] = [];
                }
                games[String(member.presence.game.name)].push(member.presence.game.name);
            }
        }
    })

    games.sort((a,b) => b.length - a.length);

    let stringGames = '';

    games.forEach(game => {
        stringGames = `${stringGames}\n[${game.length}] ${game[0]}`;
    })

    await msg.channel.send(
        new RichEmbed()
        .setDescription(stringGames)
    )
}
