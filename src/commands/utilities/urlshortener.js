const fetch = require('node-fetch');

module.exports = {
    name: "urlshortener",
    description: "Do you want to short your URL?",
    usage: '<URL>',
    category: "utilities",
    run: async (bot, msg) => {
        if(!msg.links.length) return bot.cmdError('No link provided');
        return fetch.default('https://cleanuri.com/api/v1/shorten', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `url=${escape(msg.links[0])}`
        })
        .then(r => r.json())
        .then(r => r.error ? bot.cmdError(r.error) : bot.cmdSuccess(r.result_url))
        .catch(e => bot.cmdError(e));
    }
}
