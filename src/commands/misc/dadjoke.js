module.exports = {
    name: "dadjoke",
    description: "Gives you a dad joke!",
    usage: ``,
    category: `misc`,
    aliases: ["dadjokes"]
}

const fetch = require('node-fetch');

module.exports.run = async (bot, msg) => {
    const API = 'https://icanhazdadjoke.com/';

    const res = await fetch(API, {headers: {Accept: 'application/json'}})
    const { joke } = await res.json();

    const embed = bot.embed()
    .setTitle('Dad Joke!')
    .setDescription(joke)
    .setColor('FF00AA')

    msg.channel.send(embed)
}
