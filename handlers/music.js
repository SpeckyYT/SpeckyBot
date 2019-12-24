const config = require('../config.json')

module.exports = (bot) => {
    bot.music = require("discord.js-musicbot-addon");
    bot.music.start(bot, {
        youtubeKey: config.youtube,
        ownerID: config.owner,
        ownerOverMember: true,
        botAdmins: [config.owner],
        insertMusic: true,
        logging: false,
        inlineEmbeds: true,
        bigPicture: true,
        requesterName: true,
        botPrefix: "     ",  //"disabled"
    })
};
