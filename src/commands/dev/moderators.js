module.exports = {
    name: "moderators",
    description: "Gives you the active/inactive moderators list!",
    category: "utilities",
    template: 'statuses',
    data: {
        type: 'Mods',
        check: (member) => member.permissions.has('MANAGE_MESSAGES') && !member.user.bot
    },
    aliases: ["moderator","mods"]
}
