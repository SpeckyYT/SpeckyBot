module.exports = {
    name: "primes",
	description: "Gives you prime numbers!",
    usage: `<base>`,
    category: `misc`,
	accessableby: "Members",
    aliases: ["prime"]
}

module.exports.run = async (bot, msg) => { 
    let primes = [];
    let numb = 1;
    let string = "";

    let base = msg.Args[0];

    if(!base || isNaN(base)){
        base = 10;
    }
    base = Math.min(Math.max(base, 2), 36);

    async function prime(){
        while(true){
            numb++;
            let temp = 1; 
            while(temp+1 < numb){
                temp++;
                if(numb % temp == 0){
                    temp = false;
                    break;
                }
            }
            if(temp){
                primes.push(numb.toString(base));
                string = `\`\`\`${primes.join(" ")}\`\`\``;
                if(string.length >= 2000){
                    primes.pop();
                    break;
                }
            }
        }
    }
    await prime();

    return msg.channel.send(`\`\`\`${primes.join(" ")}\`\`\``)
}
