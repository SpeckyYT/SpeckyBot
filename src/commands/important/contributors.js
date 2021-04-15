module.exports = {
    name: 'contributors',
    description: 'Lists the contributors of SpeckyBot!',
    category: 'important',
    type: 'send',
    aliases: ['contributions','contributor','contribution']
}

const { join } = require('path');

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
    .addField('Donations',
        Object.keys(
            bot.require(
                join(__dirname,'data','donations.json')
            )
        )
        .join(', ')
    )
    .addField('Other',
        [
            'ZuckerHeld'
        ]
        .join(', ')
    )
