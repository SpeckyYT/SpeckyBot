const censor = require('discord-censor');
const fetch = require('node-fetch');

const bwsource = 'https://raw.githubusercontent.com/chucknorris-io/swear-words/master/en';

module.exports = (bot) => {
    fetch.default(bwsource)
    .then(r => r.text())
    .then(w => w.split('\n'))
    .then(w =>
        censor.badwords.push(...w.filter(b => !censor.badwords.includes(b)))
    )
    .catch(() => {})

    bot.censorText = (string, censor) =>
        censor.censor(string, censor || '*\u200b'.repeat(6));

}
