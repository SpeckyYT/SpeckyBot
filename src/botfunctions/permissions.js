const send = 'SEND_MESSAGES';
const view = 'VIEW_CHANNEL';
const files = 'ATTACH_FILES';
const embed = 'EMBED_LINKS';

module.exports = (bot) => {
    bot.perms = {
        globalchat: [view,send,files,embed],
        commands: [files,embed],
    }
}
