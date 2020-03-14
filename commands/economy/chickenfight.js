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
    let bet = bot.parseBet(economy,author,obet);
    
    if(bet === 0){return bot.cmdError(`You only have ${economy[author.id].money}₪ in the bank.`)}
    if(bet === "0"){return bot.cmdError(`Minimum bet is 100₪`)}
    if(bet === false){return bot.cmdError("Bet it not a Number")};

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

    return await require('./functions/economy').write(economy);
}