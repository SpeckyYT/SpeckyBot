module.exports = {
    name: "pay",
    usage: "<@user> <amount>",
    category: "economy",
    description: "Lets you pay someone else [Experimental]",
}

const db = require('quick.db');
const economy = new db.table('economy');

module.exports.run = async (bot, msg) => {
    const { author } = msg;

    const receiver = msg.mentions.users.first();
    if(!receiver){
        return bot.cmdError("You have to tag someone to pay.");
    }
    bot.economySummon(receiver);

    const numberRegex = /[\s]\d+/g;
    const matches = msg.cmdContent.match(numberRegex);
    if(!matches){
        return bot.cmdError("You have to define an amount of money to pay.")
    }

    const amount = Number(parseInt(matches[0].slice(1)));
    if(isNaN(amount)){
        return bot.cmdError(`Amount is not a Number`); // This should never happen in theory, but better doing it anyway...
    }
    if(amount > economy.get(`${author.id}.money`)){
        return bot.cmdError(`You only have ${economy.get(`${author.id}.money`)}₪ in the bank.`)
    }
    if(amount === 0){
        return bot.cmdError(`You can't pay someone 0₪`);
    }

    economy.add(`${author.id}.money`,-amount)
    economy.add(`${receiver.id}.money`,amount)

    msg.channel.send(
        bot.embed()
        .setAuthor(author.tag,author.displayAvatarURL())
        .setThumbnail()
        .setDescription(`${receiver} has received your ${amount}₪`)
        .setColor("GREEN")
    );
};
