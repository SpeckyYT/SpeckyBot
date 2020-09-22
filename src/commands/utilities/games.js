module.exports = {
    name: "games",
    description: "What's the most played game in this server?",
    category: "utilities",
    aliases: ["game"]
}

const { MessageEmbed } = require('discord.js')

module.exports.run = async (bot, msg) => {
    const games = [];

    await msg.guild.members.cache.forEach(member => {
        if(!member.user.bot){
            if(member.presence.activities){
                if(!games[String(member.presence.activities.name)]){
                    games[String(member.presence.activities.name)] = [];
                }
                games[String(member.presence.activities.name)].push(member.presence.activities.name);
            }
        }
    })

    games.sort((a,b) => b.length - a.length);

    let stringGames = '';

    games.forEach(game => {
        stringGames = `${stringGames}\n[${game.length}] ${game[0]}`;
    })

    await msg.channel.send(
        new MessageEmbed()
        .setDescription(stringGames)
    )
}
