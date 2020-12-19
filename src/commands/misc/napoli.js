module.exports = {
    name: 'napoli',
    description: "Emulates the neapolitan dialect!\nThanks to Lory for making this possible!",
    category: 'misc',
    usage: '<italian text>',
    aliases: ['naples','neapolitan','napoletano']
}

const neapolitan = require('neapolitan-wrapper');

module.exports.run = async (bot,msg) => {
    if(!msg.cmdContent) return bot.cmdError('Missing content');
    const napoli = await neapolitan(msg.cmdContent);
    return msg.channel.send(napoli);
}
