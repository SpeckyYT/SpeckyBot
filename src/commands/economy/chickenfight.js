module.exports = {
    name: "chickenfight",
    aliases: ["cockfight", "cf"],
    usage: "<bet>",
    category: "economy",
    description: "Gets your current bot balance [Experimental]",
}

module.exports.run = async (bot, msg) => {
    const { economy } = bot
    const { author } = msg;

    const obet = msg.args[0];
    const bet = bot.parseBet(author,obet);
    const res = bot.resolveBet(author,bet);
    if(res) return res;

    const won = Math.round(Math.random()) || msg.author.id.isOwner();

    if(won){
        economy[author.id].money = economy[author.id].money + bet;
        msg.channel.send(
            bot.embed()
            .setAuthor(author.tag,author.avatarURL())
            .setDescription(`Your little chicken won the fight!\n${bet}₪ got added to your bank! :rooster:`)
            .setColor('GREEN')
        );
    }else{
        economy[author.id].money = economy[author.id].money - bet;
        msg.channel.send(
            bot.embed()
            .setAuthor(author.tag,author.avatarURL())
            .setDescription(`Your chicken died... `)
            .setColor('RED')
        );
    }
}
