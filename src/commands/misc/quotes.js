module.exports = {
    name: 'quote',
    description: 'Gives you a quote!',
    category: 'misc',
    aliases: ['quotes']
}

const fetch = require('node-fetch');
const api = "http://api.quotable.io/random";

module.exports.run = async (bot, msg) => {
    const { _id, tags, content, author, length } = await fetch(api)
    .then(res => res.json());

    return msg.channel.send(
        bot.membed()
        .setTitle("Quote!")
        .setDescription(`${content.code()}\n-${author}`)
    )
}
