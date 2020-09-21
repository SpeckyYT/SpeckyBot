module.exports = {
    name: "dice",
    description: "Lets you play with dice!",
    usage: `<amount>`,
    category: "games"
}

const { MessageEmbed } = require('discord.js');

module.exports.run = async (bot, msg) => {
    const dice = [
        bot.emotes.dice1,
        bot.emotes.dice2,
        bot.emotes.dice3,
        bot.emotes.dice4,
        bot.emotes.dice5,
        bot.emotes.dice6,
    ];

    const quantity = isNaN(msg.args[0]) ? 1 : msg.args[0] <= 1 ? 1 : msg.args[0];
    const res = [], str = [];
    let index = 0;
    while(index < quantity && res.length < 50){
        const roll = Math.floor(Math.random()*6);
        res.push(roll+1);
        str.push(dice[roll])
        index++;
    }

    const embed = new MessageEmbed()
    .setColor('BLACK')
    .setTitle('Dice!')
    .addField('Dice Amount',index)
    .addField('Total Rolled',res.reduce((p,c)=>p+c))
    .setThumbnail('https://images.emojiterra.com/twitter/v12/512px/1f3b2.png')
    .setDescription(str.join(''));

    return msg.channel.send(embed);
}
