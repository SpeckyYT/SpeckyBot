module.exports = {
    name: "chickenfight",
    aliases: ["cockfight", "cf"],
    usage: "<bet>",
    category: "economy",
    description: "Gets your current bot balance [Experimental]",
    accessibleby: "member"
}
  
module.exports.run = async (bot, msg) => {
    let { economy } = bot
    let { author } = msg;

    let obet = msg.args[0];
    console.log(obet)
    let bet = bot.parseBet(economy,author,obet);
    console.log(bet);
    if(bet === 0){return bot.cmdError("You don't have enough money for this")}
    if(!bet){return bot.cmdError("Bet it not a Number")};

    let won = Math.round(Math.random())

    if(won){
        economy[author.id].money = Number(economy[author.id].money) + Number(bet);
        let embed = bot.embed()
            .setAuthor(author.tag,author.avatarURL)
            .setDescription(`Your little chicken won the fight!\n${bet}₪ got added to your bank! :rooster:`)
            .setColor('GREEN');
        msg.channel.send(embed);
    }else{
        economy[author.id].money = economy[author.id].money - bet;
        let embed = bot.embed()
        .setAuthor(author.tag,author.avatarURL)
        .setDescription(`Your chicken died... `)
        .setColor('RED');
    msg.channel.send(embed);
    }

    return await require('./functions/write')(economy)
}