module.exports = {
    name: "primes",
    description: "Gives you prime numbers!",
    category: "math",
    aliases: ["prime"]
}

const qdb = require('quick.db');
const misc = new qdb.table('misc');

module.exports.run = async (bot, msg) => {
    const startPrimes = [];
    const primes = [];
    let numb = 1;
    let string = "";

    try{
        startPrimes.push(...(misc.get('primes')||[]));
        numb = startPrimes.last() || 1;
    }catch(e){}

    async function prime(){
        numb++;
        if([...primes,...startPrimes].every(p=>numb%p)){
            primes.push(numb);
            string = primes.join(" ");
        }
        if(string.length >= 1980){
            primes.pop();
            return;
        }
        await prime();
    }
    await prime();

    misc.set('primes',[...startPrimes,...primes]);

    return msg.channel.send(primes.join(" "),{code:'js'})
}
