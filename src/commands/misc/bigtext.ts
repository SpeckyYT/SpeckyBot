import { Message } from "discord.js";
import { SpeckyClient } from "../../../typings/Client";
import { CmdMessage } from "../../../typings/Message";

module.exports = {
    name: "bigtext",
    description: "Turns your text into a super text!",
    usage: 'text',
    category: 'misc',
    aliases: ["bt"],
    run: async (bot:SpeckyClient, msg:CmdMessage): Promise<Error|Message> => {
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
            z: "🇿"
        }

        let text:string|Array<string> = msg.cmdContent.toLowerCase().trim();

        text = [...text].filter(c => characters[c] || [' ','\n'].includes(c));

        if(!text.filter(c => [' ','\n'].includes(c)).length) return bot.cmdError("You need to include a valid string");
        
        const string = [];

        text.forEach(l => string.push((characters[l] || l)+(l=='\n'?'':' ')))

        return msg.channel.send(string.join(''));
    }
}