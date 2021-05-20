const stringify = (regex) => {
    const string = `${regex}`;
    const array = string.split('/');
    const fixed = array.slice(1, array.length-1);
    return fixed.join('/');
}

const logColors = /[\x1b][[][0-9]{2}m/g
const tabs = /\t/g
const trimLeftRight = / +\n +/g
const trimLeft = /\n +/g
const trimRight = / +\n/g
const trimStart = /^\s+/g
const trimEnd = /\s+$/g
const spaces = / +/g
const id = /(\b\d{17,19}\b)/g
const messageLink = /https?:\/\/(?:\w+\.)?discord(?:app)?\.com\/channels\/(\d+)\/(\d+)\/(\d+)\/?/gi
const inviteLink = /(?:\S*)(https?:\/\/)?(www\.)?(discord(?:app)?\.gg(?:\/|\\+\/+)|discord(?:app)?\.com(?:\/|\\+\/+)(?:invite\/))([A-z0-9-]{2,})/gi
const link = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&\\/=]*)/gi
const emote = /<a?:[\w]+:(\d{17,19})>/gi
const ignoreCensor = new RegExp(
    [
        link,
        emote,
    ]
    .map(regex => `(?:${stringify(regex)})`)
    .join('|'),
    'gi'
);

module.exports = (bot) => {
    bot.regex = {
        logColors,
        tabs,
        trimLeftRight,
        trimLeft,
        trimRight,
        trimStart,
        trimEnd,
        spaces,
        id,
        messageLink,
        inviteLink,
        link,
        emote,
        ignoreCensor,
    }
}
