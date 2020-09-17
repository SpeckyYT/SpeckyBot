module.exports = {
    name: "bigtext",
    description: "Turns your text into a super text!",
    usage: 'text',
    category: 'misc',
    aliases: ["bt"],
    run: async (bot, msg) => {
        const characters = {
            a: "🇦",
            b: "🇧",
            c: "🇨",
            d: "🇩",
            e: "🇪",
            f: "🇫",
            g: "🇬",
            h: "🇭",
            i: "🇮",
            j: "🇯",
            k: "🇰",
            l: "🇱",
            m: "🇲",
            n: "🇳",
            o: "🇴",
            p: "🇵",
            q: "🇶",
            r: "🇷",
            s: "🇸",
            t: "🇹",
            u: "🇺",
            v: "🇻",
            w: "🇼",
            x: "🇽",
            y: "🇾",
            z: "🇿",
            " ": " ",
            "\n": "\n"
        }

        if(!msg.cmdContent) return bot.cmdError("You need to include a valid string");

        const text = [...msg.cmdContent.toLowerCase().trim()]
        .filter(c => characters[c])
        .map(l => characters[l] + (l == "\n" ? "" : " "))
        .join('');
        return msg.channel.send(text);
    }
}
