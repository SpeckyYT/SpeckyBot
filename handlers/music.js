const config = require('../config.json')

module.exports = (bot) => {
    bot.music.start(bot, {
        youtubeKey: config.youtube,
        ownerID: config.owner,
        ownerOverMember: true,
        botAdmins: [config.owner],
        insertMusic: true,
        logging: false,
        botPrefix: null,
        inlineEmbeds: true,
        bigPicture: true,
        requesterName: true,
        botPrefix: "     ",  //"disabled"
    })
};
