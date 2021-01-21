module.exports = {
    name: "vote",
    description: "Vote SpeckyBot!",
    category: "important",
    aliases: ['upvote','like']
}

module.exports.run = async (bot, msg) => {
    const botlists = [
        ['Discord Boats','https://discord.boats/bot/398157933315227649/vote'],
        ['Discord Bot List','https://discordbotlist.com/bots/speckybot/upvote'],
        ['Shield Bot List','https://shieldbotlist.tk/bots/like/398157933315227649'],
        ['Discord Extreme List','https://discordextremelist.xyz/en-US/bots/398157933315227649'],
        ['NextGen Bots','https://nextgenbots.xyz/bots/398157933315227649/vote'],
    ]

    const embed = bot.membed().setTitle('Upvote SpeckyBot!');

    for(const botlist of botlists) embed.addField(...botlist);

    return msg.channel.send(embed);
}
