module.exports = {
    name: "primes",
    description: "Gives you prime numbers!",
    usage: `<base>`,
    category: `misc`,
    accessableby: "Members",
    aliases: ["prime"]
}

module.exports.run = async (bot, msg) => { 
    const primes = [];
    let numb = 1;
    let string = "";

    let base = msg.Args[0];

    if(!base || isNaN(base)){
        base = 10;
    }
    base = Math.min(Math.max(base, 2), 36);

    async function prime(){
        while(numb++){
            if(primes.every(p=>numb%parseInt(p,base))){
                primes.push(numb.toString(base));
                string = `\`\`\`${primes.join(" ")}\`\`\``;
                if(string.length >= 1980){
                    primes.pop();
                    break;
                }
            }
        }
    }
    await prime();

    return msg.channel.send(`\`\`\`${primes.join(" ")}\`\`\``)
}
