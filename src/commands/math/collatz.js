module.exports = {
    name: "collatz",
    description: "Gives you the collatz sequence!",
    usage: `[number]`,
    category: `math`,
    aliases: ["coll"]
}


const collatzPath = '.\\commands\\math\\data\\collatz.txt';
const { writeFile, readFileSync } = require('fs');

module.exports.run = async (bot, msg) => {
    const collatz = [];
    let numb = 2;

    try{
        numb = Math.floor(Number(readFileSync(collatzPath,{encoding:'UTF8'}))) || 2;
    }catch(e){}

    let startNumb = numb;

    if(!isNaN(msg.args[0])){
        numb = msg.args[0];
        startNumb = false;
    }

    async function coll(){
        collatz.push(numb);
        if(numb == 1){
            return;
        }
        numb = numb%2 ? 3*numb+1 : numb/2;
        if(collatz.join(" ").length >= 1980){
            collatz.pop();
            return;
        }else{
            await coll();
        }
    }
    await coll();

    if(startNumb) writeFile(collatzPath,startNumb+1,e=>e?console.error(e):null);

    return msg.channel.send(`\`\`\`${collatz.join(" ")}\`\`\``);
}
