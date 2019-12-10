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
        botPrefix: "NtV4vGZ5o4EAbKy2ZyfCOXTyw5dT3o2KrsDzn5tV0FCQOQxCLRZZsSpMjims9nWUERdU87eoMDYfj23I",  //"disabled"
    })
};
