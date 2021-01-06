const fetch = require('node-fetch');

const bwsource = 'https://raw.githubusercontent.com/chucknorris-io/swear-words/master/en';

module.exports = (bot) => {
    let { badwords } = this;

    bot.censureText = async (string) => {
        if(!badwords){
            badwords = await fetch(bwsource)
            .then(res => res.text())
            .then(text => text.split('\n'));
        }
        const censures = [
            bot.emotes.censure1,
            bot.emotes.censure2
        ];
        return string.replace(
            new RegExp(`(?<=\\b)(${badwords.join('|')})(?=\\b)`,'gi'),
            Array(Math.ceil(Math.random()*4))
            .fill('')
            .map(()=>censures.pick())
            .join('')
        )
    }

}
