const { youtube, owner } = require('../config.json')

module.exports = async (bot) => {
    bot.music = require("discord.js-musicbot-addon");
    bot.music.start(bot, {
        youtubeKey: youtube,
        ownerID: owner[0],
        ownerOverMember: true,
        botAdmins: owner,
        insertMusic: true,
        logging: false,
        inlineEmbeds: true,
        bigPicture: true,
        requesterName: true,
        botPrefix: "     ",  //"disabled"
    })
};
