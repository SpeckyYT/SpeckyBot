module.exports = {
    name: "dice",
    description: "Lets you play with dice!",
    usage: `<amount>`,
    category: `games`,
    aliases: []
}

const dice = [
    "<:dice1:735388205062291507>",
    "<:dice2:735388205527990282>",
    "<:dice3:735388205469270026>",
    "<:dice4:735388205540573194>",
    "<:dice5:735388205247103049>",
    "<:dice6:735388204932399186>"
];
const { RichEmbed } = require('discord.js');

module.exports.run = async (bot, msg) => {
    const quantity = isNaN(msg.args[0]) ? 1 : msg.args[0] <= 1 ? 1 : msg.args[0];
    const res = [], str = [];
    let index = 0;
    while(index < quantity && res.length < 50){
        const roll = Math.floor(Math.random()*6);
        res.push(roll+1);
        str.push(dice[roll])
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
