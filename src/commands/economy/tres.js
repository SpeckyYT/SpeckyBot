module.exports = {
    name: "tres",
    description: "Lets you play tres!",
    usage: '<bet>',
    category: "economy",
}

const { toEmoji } = require('number-to-emoji');
const db = require('quick.db');
const economy = new db.table('economy');

module.exports.run = async (bot, msg) => {
    const obet = msg.args[0];
    const bet = bot.parseBet(msg.author,obet);
    const res = bot.resolveBet(msg.author,bet);
    if(res) return res;

    const mults = [0,1,2].shuffle();

    const m = await msg.channel.send(drawEmb(bot,mults,false))

    const resp = await msg.channel.awaitMessages(
        m => m.author.id == msg.author.id && ['1','2','3'].includes(m.content),
        {max:1,time:30000,errors:['time']}
    )
    .then(r=>r.first())
    .catch(()=>{});
    if(!resp) return;

    const n = Number(resp.content);
    const mult = mults[n-1];
    const gain = -bet+(bet*mult);

    return m.edit(drawEmb(bot,mults,true))
    .then(()=>economy.add(`${msg.author.id}.money`,gain))
    .catch(()=>bot.cmdError('Error happened'));
}

function drawEmb(bot,arr,bool){
    return bot.embed()
    .setTitle('Tres')
    .setDescription(
        draw(arr,bool)
    )
    .setFooter(bool ? '' : 'Select one')
}

function draw(arr,bool){
    return arr.map((v,i) => `${i+1}) Multiplier: ${bool ? toEmoji(v) :'❓'}`).join('\n')
}
