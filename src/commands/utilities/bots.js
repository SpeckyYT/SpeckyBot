module.exports = {
    name: "bots",
    description: "Gives you the online/offline bots list!",
    category: "utilities",
    template: 'statuses',
    data: {
        type: 'Bots',
        check: (member) => member.user.bot
    },
    aliases: ["bot","robot","robots"]
}
