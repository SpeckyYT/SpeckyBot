module.exports = (bot) => {
    bot.globalChatRules = () => {
        const userRules = [
            "Be sure to follow the following rules!",
            "No NSFW/NSFL or similars. Don't send anything related to +18/illegal/disturbing/unsettling content.",
            "Don't spam. This includes sending earrape videos, sending huge messages, sending too many attachments and disturbing ongoing discussions.",
            "Don't use bot commands (of any bot). Use a bot-channel instead.",
            "Don't advertise. Do that in other channels where it's permitted.",
            "Be as nice as possible to everyone.",
            "Don't try to bypass any of the automatic filters/limitations.",
        ]
        .map((rule,i) => `${i ? `${i}.` : '#'} ${rule}`)
        .join('\n');

        const adminRules = [
            "The next rules/informations are specifically for server admins/moderators.",
            "It's highly recommended to create a new/separate channel for the global-chat.",
            "The global-chat channel can't be tagged as NSFW.",
            "Every server should moderate it's own server of the global-chat.",
            "If anyone breaks one of the rules above, the moderation team of that server should delete the message.",
            "If big part of a server doesn't follow the rules, the server may get banned from using SpeckyBot.",
            `Your server will have to have at least ${bot.cache.gcminmembers || 10} members.`,
            "SpeckyBot requires the following permissions: `read/send messages/files/embeds and manage messages`"
        ]
        .map((rule,i) => `${i ? `${i}.` : '#'} ${rule}`)
        .join('\n');

        const reactions = [
            "On some messages, you may get a reaction right after sending (the message gets ignored).",
            `${bot.emotes.notwice}: Don't send more than two messages in a row`,
            `${bot.emotes.toolong}: Your message is too big`,
            `${bot.emotes.noexternal}: Your message contains external emotes`,
        ]
        .map((v,i) => i ? v : v.code())
        .join('\n');

        const notes = [
            "Note:",
            "Every channel connected to the global-chat can read your messages.",
            "Everyone will see your username (and icon)",
            "Everyone will see the name of the server you're writing in (and icon)",
            "Editing and deleting messages is possible.",
            "Sending images is allowed (if they're not against the rules)",
            "Rules may be subjected to changes at any time",
        ]
        .map((note,i) => `${i ? `-`: "+"} ${note}`)
        .join('\n');

        const tldr = [
            "too long; didn't read.",
            "Don't be a dumbass.",
            "Don't share private/personal data.",
            "Read the entire page you lazy ass.",
            "Have fun.",
        ]
        .map((tl,i) => `${i ? `[${i}]:`: "#"} ${tl}`)
        .join('\n');

        return bot.embed()
        .setTitle('Global Chat!')
        .setDescription(
            [
                "The Global Chat is a cross-server channel which allows you to make new friends, ask questions, talk about general stuff and much more!".code('fix'),
                "By including \"[GLOBAL]\" into a channel's topic, the channel will turn into a global-chat!".code('c'),
            ]
        )
        .addFields(
            {
                name: "User Rules",
                value: userRules.code('md'),
            },
            {
                name: "Mods/Admins Rules/Informations",
                value: adminRules.code('md'),
            },
            {
                name: "Reactions",
                value: reactions,
            },
            {
                name: "Notes",
                value: notes.code('diff'),
            },
            {
                name: "TL;DR",
                value: tldr.code('md'),
            },
        )
        .setFooter(`${bot.globalchats.size} Global Chats Connected`)
    }
}
