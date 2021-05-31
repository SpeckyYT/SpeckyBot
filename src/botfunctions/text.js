const cringe = [
    // LZeuch
    "🙌","🙏","👏",
    "😍","🥵","🥶","😊","🥰","🤯","🤡",
    "🙀",
    // Specky
    "🤪","🤣","🥺","🤩","😱","🥴",
]

const others = [
    "😛","😝","😜","😃","😉","😘","🙁","😥","😰","😮","😴","🤤","😪","😵","🤢","🤮",
    "👻","☠️","🤖",
    "🤏","👊","👍",
    "💄","💋","👄","👁️","👀","🧠",
    "🐟","🐬","🦈","🦀",
    "🦧","🐘","🐷","🐰","🐭","🐱","🐶","🐌",
    "🐛","🐝",
    "🦅","🐤","🐦","🐧",
    "🌎","🌍","🌏","🌕","🌑","🌝","🌚",
    "🍌","🍑","🍒","🍓","🍆",
    "🍝","🥓","🥚",
    "🎲","🎮","🩰","🔫","📌",
    "🏳️‍🌈","🏴‍☠️","🏁",
]

const emojis = [
    ...cringe,
    ...others,
]

module.exports = (bot) => {

    bot.textToEmojiSpam = (text) => {
        const emojiOMeter = 0.5;
        const cringeOMeter = 0.2;
        const maxEmojis = 3;
        const minEmojis = 1;

        return text.split(' ')
        .map(txt => {
            if(Math.random() < emojiOMeter){
                const count = Math.floor(Math.random()*(maxEmojis-minEmojis)+minEmojis);
                const spam = [];
                for(let i = 0; i < count; i++)
                    spam.push((Math.random() < cringeOMeter ? cringe : emojis).pick())
                return `${txt} ${spam.join(' ')}`
            }
            return txt;
        })
        .join(' ');
    }

}
