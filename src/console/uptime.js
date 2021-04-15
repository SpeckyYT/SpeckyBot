module.exports = {
    name: 'uptime'
}

const prettyMs = require('pretty-ms');

module.exports.run = async (bot, data) => {
    console.log(prettyMs(bot.uptime, { verbose: true }).cli)
}
