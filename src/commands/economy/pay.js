module.exports = {
    name: "pay",
    aliases: [],
    usage: "<@user> <amount>",
    category: "economy",
    description: "Lets you pay someone else [Experimental]",
}

module.exports.run = async (bot, msg) => {
    const { economy } = bot;
    const { author } = msg;

    const receiver = msg.mentions.users.first();
    if(!receiver){
        return bot.cmdError("You have to tag someone to pay.");
    }
    bot.economySummon(bot, receiver);

    const numberRegex = /[\s>-]\d+/g;
    const matches = msg.cmdContent.match(numberRegex);
    if(!matches){
        return bot.cmdError("You have to define an amount of money to pay.")
    }

    const amount = Number(parseInt(matches[0].slice(1)));
    if(amount > economy[author.id].money){
        return bot.cmdError(`You only have ${economy[author.id].money}₪ in the bank.`)
    }
    if(amount === 0){
        return bot.cmdError(`You can't pay someone 0₪`);
    }
    if(!amount){
        return bot.cmdError(`Amount is not a Number`); // This should never happen in theory, but better doing it anyway...
    }

    economy[author.id].money -= amount;
    economy[receiver.id].money += amount;

    const embed = bot.embed()
    .setAuthor(author.tag,author.avatarURL)
    .setThumbnail()
    .setDescription(`${receiver} has received your ${amount}₪`)
    .setColor("GREEN")
    msg.channel.send(embed);
};
