const config = require('../../config.json')

module.exports = (bot) => {
    bot.music.start(bot, {
        youtubeKey: config.youtube,
        ownerOverMember: true,
        ownerID: config.owner,
        insertMusic: true
    })
};
