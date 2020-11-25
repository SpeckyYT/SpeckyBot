// https://api.genderize.io/?name=<name>

module.exports = {
    name: "guessgender",
    description: "Tries to guess the gender of a person using it's first name",
    usage: "<name>",
    template: 'ize-ify.io',
    data: {
        domain: 'genderize',
        handler: (bot,msg,data) => {
            const {name, gender, probability, count, error} = data;
            if(error) return bot.cmdError(error);
            if(!gender) return bot.cmdError('Invalid name (gender is null)');
            return msg.channel.send(
                bot.embed()
                .setTitle(name)
                .setDescription(`is ${gender}`)
                .setFooter(`Probability: ${probability*100}%`)
            );
        }
    },
    category: "utilities",
    aliases: ["genderize"]
}
