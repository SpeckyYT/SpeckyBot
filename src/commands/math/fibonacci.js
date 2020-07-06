module.exports = {
    name: "fibonacci",
    description: "Gives you the fibonacci sequence!",
    usage: ``,
    category: `math`,
    aliases: []
}

module.exports.run = async (bot, msg) => { 
    const fibonacci = [0,1];
    let string = "";

    async function fibo(){
        while(true){
            const len = fibonacci.length;
            fibonacci.push(fibonacci[len-1]+fibonacci[len-2]);
            string = `\`\`\`${fibonacci.join(" ")}\`\`\``;
            if(string.length >= 1980){
                fibonacci.pop();
                break;
            }
        }
    }
    await fibo();

    return msg.channel.send(`\`\`\`${fibonacci.join(" ")}\`\`\``)
}
