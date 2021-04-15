module.exports = [
    {
        event: "0 0 12 * * 4",
        timezone: 'America/Mexico_City',
        call: (bot) => {
            bot.channels.fetch('829451286403481660')
            .then(c =>
                c.send(
                    bot.embed()
                    .setTitle('EpicGames')
                    .setDescription('New free game should be out!')
                    .setColor('#000000')
                )
            )
            .catch(()=>{})
        }
    },
];
