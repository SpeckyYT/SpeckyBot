const send = 'SEND_MESSAGES';
const view = 'VIEW_CHANNEL';
const files = 'ATTACH_FILES';
const embed = 'EMBED_LINKS';
const msgs = 'MANAGE_MESSAGES';

module.exports = (bot) => {
    bot.perms = {
        globalchat: [
            view,
            send,
            files,
            embed,
            msgs,
        ],
        commands: [
            files,
            embed,
        ],
    }
}
