module.exports = {
    event: "filteredMessage"
}

const qdb = require('quick.db');
const usersettings = new qdb.table('usersettings');

module.exports.call = async (bot, msg) => {
    if(!usersettings.get(`${msg.author.id}.reactions`)) return;

    // const contento = msg.content;                     // Original one
    const contentl = msg.content.toLowerCase();       // Lower Case one
    // const contentu = msg.content.toUpperCase();       // Upper Case one

    if(msg.channel.permissionsFor ? msg.channel.permissionsFor(bot.user).has('ADD_REACTIONS') : true){
        [
            [contentl.includes('specky'),bot.emotes.specky],
            [contentl.includes('crafter'),bot.emotes.crafter],
            [contentl.includes('juan'),'🐴'],
            [contentl.includes('😎'),bot.emotes.songlosses],
            [contentl.replace(/[^a-z0-9]/g,'') == 'hai','🦈'],
        ]
        .forEach(([c,e]) =>
            c &&
            msg.react(typeof e == 'string' && e.length > 10 ? e.match(bot.regex.id)[0] : e)
            .catch(()=>{})
        )
    }
}
