const fetch = require('node-fetch');

const badwords = fetch('https://raw.githubusercontent.com/RobertJGabriel/Google-profanity-words/master/list.txt')
.then(res => res.text())
.then(text => text.trimLeft().trimRight().split('\n'));

module.exports = (bot) => {

    const censures = [
        bot.emotes.censure1,
        bot.emotes.censure2
    ];

    bot.censureText = async (string) => {
        const bw = await badwords;
        let newString = string;
        for(let badword of bw){
            newString = newString.replace(
                new RegExp(`(?<=\\b)${badword}(?=\\b)`,'gi'),
                Array(Math.ceil(badword.length/4))
                .fill('')
                .map(()=>censures.pick())
                .join('')
            )
        }
        return newString;
    }

}
