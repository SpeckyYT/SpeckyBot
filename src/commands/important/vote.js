module.exports = {
    name: "vote",
    description: "Vote SpeckyBot!",
    category: "important",
    aliases: ['upvote','like']
}

module.exports.run = async (bot, msg) => {
    const botlists = [
        [
            'Top.gg',
            'https://top.gg/bot/398157933315227649/vote'
        ],
        [
            'Discord Boats',
            'https://discord.boats/bot/398157933315227649/vote'
        ],
        [
            'Discord Bot List',
            'https://discordbotlist.com/bots/speckybot/upvote'
        ],
        [
            'Shield Bot List',
            'https://shieldbotlist.tk/bots/like/398157933315227649'
        ],
        [
            'Discord Extreme List',
            'https://discordextremelist.xyz/en-US/bots/398157933315227649'
        ],
        [
            'NextGen Bots',
            'https://nextgenbots.xyz/bots/398157933315227649/vote'
        ],
    ]

    const embed = bot.embed()
    .setTitle('Upvote SpeckyBot!')
    .setDescription(botlists.map(([list,link]) => `[${list}](${link})`).join('\n'));

    return msg.channel.send(embed);
}
