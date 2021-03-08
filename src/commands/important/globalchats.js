module.exports = {
    name: "globalchats",
    description: "Gives you some more informations about the Global Chat!",
    category: "important",
    aliases: ['globalchat','gc']
}

module.exports.run = async (bot, msg) => {
    const rules = [
        [
            "Be sure to follow the following rules!",
            "No NSFW/NSFL or similars. The global-chat is a SFW chat, which means that you're not allowed to send anything related to +18/illegal/disturbing/unsettling content.",
            "Don't spam. If nobody else is writing, be sure to edit your previous message instead of sending new ones.",
            "Don't use bot commands (of any bot). Use a bot-channel instead.",
            "Don't advertise. Do that in other channels where it's permitted.",
            "Be as nice as possible to everyone.",
            "Don't try to bypass any of the automatic filters/limitations.",
        ],
        [
            "The next rules are specifically for server admins/moderators.",
            "It's highly recommended to create a new/separate channel for the global-chat.",
            "The global-chat channel can't be tagged as NSFW.",
            "Every server should moderate it's own server of the global-chat.",
            "If anyone breaks one of the rules above, the moderation team of that server should delete the message.",
            "If the server doesn't follow the rules, the server may get banned from using SpeckyBot.",
        ],
    ]
    .map(rules => rules.map((rule,i) => `${i ? `${i}.` : '#'} ${rule}`).join('\n'))
    .join('\n\n');

    const notes = [
        "Note:",
        "Every channel connected to the global-chat can read your messages.",
        "Everyone will see your username (and icon)",
        "Everyone will see the name of the server you're writing in (and icon)",
        "Editing and deleting messages is possible.",
        "Sending images is allowed (if they're not against the rules)",
    ]
    .map((note,i) => `${i ? `-`: "+"} ${note}`)
    .join('\n');

    const reactions = [
        "On some messages, you may get a reaction once sending, and if it is one of the following, your message didn't got send to the Global-Chat",
        `${bot.emotes.notwice}: Don't send more than two messages in a row`,
        `${bot.emotes.toolong}: Your message is too big`,
        `${bot.emotes.noexternal}: Your message contains external emotes`,
    ]
    .map((v,i) => i ? v : v.code())
    .join('\n');

    return msg.channel.send(
        bot.embed()
        .setTitle('Global Chat!')
        .setDescription(
            [
                "The Global Chat is a cross-server channel which allows you to make new friends, ask questions, talk about general stuff and much more!".code('fix'),
                "By including \"[GLOBAL]\" into a channel's topic, the channel will turn into a global-chat!".code('c'),
                rules.code('md'),
                notes.code('diff'),
                reactions
            ]
        )
        .setFooter(`${bot.globalchats.size} Global Chats Connected`)
    )
}
