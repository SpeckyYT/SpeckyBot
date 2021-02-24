module.exports = (bot) => {
    bot.regex = {
        logColors: /[\x1b][[][0-9]{2}m/g,
        tabs: /\t/g,
        trimLeftRight: / +\n +/g,
        trimLeft: /\n +/g,
        trimRight: / +\n/g,
        trimStart: /^\s+/g,
        trimEnd: /\s+$/g,
        spaces: / +/g,
        id: /(\d{17,19})/g,
        messageLink: /https?:\/\/(?:\w+\.)?discord(?:app)?\.com\/channels\/(\d+)\/(\d+)\/(\d+)\/?/gi,
        inviteLink: /(?:\S+)(https?:\/\/)?(www\.)?(discord(?:app)?\.gg(?:\/|\\+\/+)|discord(?:app)?\.com(?:\/|\\+\/+)(?:invite\/))([A-z0-9-]{2,})/gi,
        link: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&\\/=]*)/gi,
        emote: /(?<=<a?:[\w]+:)(\d{17,19})(?=>)/gi
    }
}
