module.exports.run = async (bot, msg) => {
    let quantity = msg.guild.emojis.size;
    let slots = 3;
    let global = false;

    if(quantity < 5){
        global = true;
        quantity = bot.emojis.size
    }

    if(!isNaN(msg.args[0])){
        if(msg.args[0] > 1){
            slots = msg.args[0];
        }
        if(msg.args[0] > 75){
            slots = 75
        }
    }

    let eArray = [];
    let neweArray = [];

    for(let i = 0; i < slots; i++){
        let emote;
        if(global){
            emote = bot.emojis.random().toString();
        }else{
            emote = msg.guild.emojis.random().toString();
        }
        neweArray.push(emote);

        if(neweArray.join('').length < 1950){
            eArray = neweArray;
        }else{
            slots = i;
            break;
        }
    }

    const allEqual = arr => arr.every( v => v === arr[0] )

    await msg.channel.send(eArray.join(''))
    await msg.channel.send(`${allEqual(eArray) ? "WINNER!" : `Please Try Again!\n||${slots} Slots\n${quantity} Emotes\n${quantity} / (${quantity}^${slots}) = ${(quantity / (quantity**slots)) * 100}%||`}`)
}

module.exports.config = {
    name: "slots",
	description: "Lets you play slots!",
    usage: `<slots quantity>`,
    category: `games`,
	accessableby: "Members",
    aliases: ["slot"]
}
