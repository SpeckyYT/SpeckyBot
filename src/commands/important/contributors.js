module.exports = {
    name: 'contributors',
    description: 'Lists the contributors of SpeckyBot!',
    type: 'template',
    aliases: ['contributions','contributor','contribution']
}

module.exports.run = async (bot,msg) =>
    bot.embed()
    .setTitle('Contributors!')
    .setDescription('Here are all contributors of SpeckyBot listed!')
    .addField('Code',
        ['Specky','hn12']
        .join(', ')
    )
    .addField('Donations',
        ['Benjiman','Dav!d']
        .join(', ')
    )
    .addField('Other',
        ['ZuckerHeld']
        .join(', ')
    )
