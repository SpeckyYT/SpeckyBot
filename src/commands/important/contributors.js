module.exports = {
    name: 'contributors',
    description: 'Lists the contributors of SpeckyBot!',
    category: 'important',
    type: 'send',
    aliases: ['contributions','contributor','contribution']
}

const SDB = require('specky-database');

module.exports.run = async (bot,msg) =>
    bot.embed()
    .setTitle('Contributors!')
    .setDescription('Here are all contributors of SpeckyBot listed!')
    .addField('Code',
        [
            'Specky',
            'hn12',
            'Devonte'
        ]
        .join(', ')
    )
    .addField('Donators',
        (await SDB('donations.json'))
        .map(({name}) => name)
        .join(', ')
    )
    .addField('Other',
        [
            'ZuckerHeld'
        ]
        .join(', ')
    )
