// https://api.agify.io/?name=<name>

module.exports = {
    name: "guessage",
    description: "Tries to guess the age of a person using it's first name",
    usage: "<name>",
    template: 'ize-ify.io',
    data: {
        domain: 'agify',
        handler: (bot,msg,data) => {
            const {name, age, count, error} = data;
            if(error) return bot.cmdError(error);
            if(!age) return bot.cmdError('Invalid name (age is null)');
            return msg.channel.send(
                bot.embed()
                .setTitle(name)
                .setDescription(`is ${age} years old`)
            );
        }
    },
    category: "utilities",
    aliases: ['agify']
}
