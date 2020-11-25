// https://api.nationalize.io/?name=<name>

module.exports = {
    name: "guessnationality",
    description: "Tries to guess the nationality of a person using it's first name",
    usage: "<name>",
    template: 'ize-ify.io',
    data: {
        domain: 'nationalize',
        handler: (bot,msg,data) => {
            const {name, country, error} = data;
            if(error) return bot.cmdError(error);
            if(!country.length) return bot.cmdError('Invalid name (countries are empty)');
            const countries = country.filter(c => c.country_id);
            if(!countries.length) return bot.cmdError('Invalid name (countries are empty)')
            return msg.channel.send(
                bot.embed()
                .setTitle(name)
                .setDescription(`is :flag_${countries[0].country_id.toLowerCase()}:`)
                .setFooter(`Probability: ${(countries[0].probability*100).toFixed(2)}%`)
            );
        }
    },
    category: "utilities",
    aliases: ["nationalize"]
}
