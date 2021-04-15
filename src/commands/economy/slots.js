module.exports = {
    name: "slots",
    description: "Lets you play slots!",
    usage: `<bet> <slots quantity>`,
    category: "economy",
    aliases: ["slot"],
}

const db = require('quick.db');
const economy = new db.table('economy');

module.exports.run = async (bot, msg) => {
    let emojis = msg.guild.emojis.cache.filter(e => e.available);
    let slots = 3;
    let global = false;

    if(emojis.size < 5){
        global = true;
        emojis = bot.emojis.cache.filter(e => e.available);
    }

    const obet = msg.args[0];
    const bet = bot.parseBet(msg.author,obet);
    const res = bot.resolveBet(msg.author,bet);
    if(res) return res;

    if(!isNaN(msg.args[1])){
        if(msg.args[1] > 1) slots = Math.ceil(msg.args[1]);
        if(slots > 50) slots = 50
    }

    let eArray = [];
    const neweArray = [];

    let oldEmote;
    let won = true;

    for(let i = 0; i < slots; i++){
        let emote;

        if(msg.author.id.isOwner()){
            if(neweArray.length){
                emote = neweArray[0];
            }else{
                if(global){
                    emote = bot.emojis.cache.random().toString();
                }else{
                    emote = msg.guild.emojis.cache.random().toString();
                }
            }
        }else if(global){
            emote = bot.emojis.cache.random().toString();
        }else{
            emote = msg.guild.emojis.cache.random().toString();
        }

        if(won){
            if(!oldEmote){
                oldEmote = emote;
            }
            won = won && (emote == oldEmote);
        }

        neweArray.push(emote);

        if(neweArray.join('').length < 1950){
            eArray = neweArray;
        }else{
            break;
        }
    }

    const gain = Math.floor(Math.max(emojis.size/15,1.25) * Math.ceil(bet**1.15 * Math.max((slots-1)**1.4,1)));

    economy.add(`${msg.author.id}.money`,won?gain:-bet);

    return msg.channel.send(`${eArray.join('')}${won ? `\nYou won ${gain}₪! 🎰` : ""}`);
}
