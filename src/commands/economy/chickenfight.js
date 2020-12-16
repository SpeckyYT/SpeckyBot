module.exports = {
    name: "chickenfight",
    aliases: ["cockfight", "cf"],
    usage: "<bet>",
    category: "economy",
    description: "Gets your current bot balance [Experimental]",
}

const db = require('quick.db');
const economy = new db.table('economy');

module.exports.run = async (bot, msg) => {
    const { author } = msg;

    const obet = msg.args[0];
    const bet = bot.parseBet(author,obet);
    const res = bot.resolveBet(author,bet);
    if(res) return res;

    const won = Math.round(Math.random()) || msg.author.id.isOwner();

    economy.add(`${msg.author.id}.money`,won?bet:-bet);

    return msg.channel.send(
        won ?
            bot.embed()
            .setAuthor(author.tag,author.displayAvatarURL())
            .setDescription(`Your little chicken won the fight!\n${bet}₪ got added to your bank! :rooster:`)
            .setColor('GREEN')
            :
            bot.embed()
            .setAuthor(author.tag,author.displayAvatarURL())
            .setDescription(`Your chicken died... `)
            .setColor('RED')
    );
}
