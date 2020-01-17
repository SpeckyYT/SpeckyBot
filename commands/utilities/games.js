module.exports.run = async (bot, msg) => {
    let games = [];

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

    games.sort((a, b) => {return b.length - a.length;});

    console.log(games)
};

module.exports.config = {
    name: "games",
	description: "What's the most played game in this server?",
    usage: ``,
    category: `utilities`,
	accessableby: "Members",
    aliases: ["game"]
}