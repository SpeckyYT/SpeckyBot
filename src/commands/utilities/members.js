module.exports = {
    name: "members",
    description: "Gives you the active/inactive members list!",
    category: "utilities",
    template: 'statuses',
    data: {
        type: 'Members',
        check: (member) => !member.user.bot
    },
    aliases: ["servermembers","allmembers"]
}
