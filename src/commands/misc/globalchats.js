module.exports = {
    name: "globalchats",
    description: "Gives you some more informations about the Global Chat!",
    category: "misc",
    aliases: ['globalchat','gc']
}

const rules = [
    [
        "Be sure to follow the following rules!",
        "No NSFW. The global-chat is a SFW chat, which means that you're not allowed to send anything related to +18 content.",
        "Don't spam. If nobody else is writing, be sure to edit your previous message instead of sending new ones.",
        "Don't advertise. Do that in other channels where it's permitted.",
        "Don't use offensive swearwords.",
    ],
    [
        "The next rules are specifically for server admins/moderators.",
        "Don't create 2 or more global-chats in one server.",
        "It's highly recommended to create a new channel for the global-chat.",
        "Every server should moderate it's own part of the global-chat.",
        "If anyone breaks one of the rules above, the moderation team of that server should delete the message."
    ],
]
.map(rules => rules.map((rule,i) => `${i ? `${i}.` : '#'} ${rule}`).join('\n'))
.join('\n\n');

const notes = [
    "Note:",
    "Every channel connected to the global-chat can read your messages.",
    "Editing and deleting messages is possible.",
    "Sending images is allowed (if they're not against the rules)",
]
.map((note,i) => `${i ? `-`: "+"} ${note}`)
.join('\n');

module.exports.run = async (bot, msg) => {
    return msg.channel.send(
        bot.embed()
        .setTitle('Global Chat!')
        .setDescription(
            [
                "The Global Chat is a cross-server channel which allows you to make new friends, ask questions, talk about general stuff and much more!".code('fix'),
                "By including \"[GLOBAL]\" into a channel's topic, the channel will turn into a global-chat!".code('c'),
                rules.code('md'),
                notes.code('diff'),
            ]
        )
        .setFooter(`${bot.globalchats.size} Global Chats Connected`)
    )
}
