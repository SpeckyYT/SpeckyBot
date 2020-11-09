const { join } = require('path');

module.exports = (bot) => {
    (bot.require||require)(join(process.cwd(),'modules','loader'))
    .loader(bot, 'languages', ({filePath}) => (bot.require||require)(filePath)())
    bot.supportedFiles = new RegExp("("+Object.keys(require.extensions).join('|')+")$");
}
