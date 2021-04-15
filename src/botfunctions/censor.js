const censor = require('good-censor');
const fetch = require('node-fetch');

const base = 'https://raw.githubusercontent.com/chucknorris-io/swear-words/master/';

const bwsources = [
    'en',
]

module.exports = (bot) => {
    Promise.all(
        bwsources.map(bwsource =>
            fetch.default(`${base}${bwsource}`)
            .then(r => r.text())
            .then(w => w.split('\n'))
            .catch(() => {})
        )
    )
    .then(badwords => badwords.flat(1))
    .then(badwords => {
        if(badwords.length){
            censor.badwords.splice(0,Infinity);
            censor.badwords.push(...badwords)
        }
    })

    bot.censorText = (string, censorText) =>
        censor.censor(
            string,
            {
                censorText: censorText,
                censorStart: 1,
            }
        );
}
