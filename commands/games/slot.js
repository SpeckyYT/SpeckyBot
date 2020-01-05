const { int } = require('random');
const { RichEmbed } = require('discord.js')

module.exports.run = async (bot, msg) => {
    let quantity = bot.emojis.size;
    let slots = 3;

    if(!isNaN(msg.args[0])){
        if(msg.args[0] > 1){
            slots = msg.args[0];
        }
    }

    let eArray = [];
    
    for(let i = 0; i < slots; i++){
        eArray.push(bot.emojis[int(1,quantity+1)]);
    }

    

    let embed = new RichEmbed()
    .setTitle('Slots!')
    .setAuthor(`${eArray.join(" ")}`)
    .setDescription(`\n${owo ? "You're the WINNER!" : "Please Try Again!"}`)
}

module.exports.config = {
    name: "slots",
	description: "Lets you play slots!",
    usage: `<slots quantity>`,
    category: `games`,
	accessableby: "Members",
    aliases: ["slot"]
}
