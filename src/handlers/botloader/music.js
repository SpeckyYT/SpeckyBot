module.exports = async (bot) => {
    bot.music = require("discord.js-musicbot-addon");
    bot.music.start(bot, {
        youtubeKey: bot.config.youtube,
        ownerID: bot.config.owner[0],
        ownerOverMember: true,
        botAdmins: bot.config.owner,
        insertMusic: true,
        logging: false,
        inlineEmbeds: true,
        bigPicture: true,
        requesterName: true,
        botPrefix: "     ",  // "disabled"
    })
};
