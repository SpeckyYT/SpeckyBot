module.exports = {
    name: "dice",
    description: "Lets you play with dice!",
    usage: `<amount>`,
    category: `games`,
    accessableby: "Members",
    aliases: []
}

const dices = ["<:dice1:703314664746123345>","<:dice2:703314678679601384>","<:dice3:703314688347471963>","<:dice4:703314697180545065>","<:dice5:703314706013880451>","<:dice6:703314715052474388>"];
const { RichEmbed } = require('discord.js');

module.exports.run = async (bot, msg) => {
    const quantity = isNaN(msg.args[0]) ? 1 : msg.args[0] <= 1 ? 1 : msg.args[0];
    const res = [], str = [];
    let index = 0;
    while(index < quantity){
        if(res.length >= 50) break;
        const roll = Math.floor(Math.random()*6);
        res.push(roll+1);
        str.push(dices[roll])
        index++;
    }

    const embed = new RichEmbed()
    .setColor('BLACK')
    .setTitle('Dice!')
    .addField('Dice Amount',index)
    .addField('Total Rolled',res.reduce((p,c)=>p+c))
    .setThumbnail('https://images.emojiterra.com/twitter/v12/512px/1f3b2.png')
    .setDescription(str.join(''));

    return msg.channel.send(embed);
}
