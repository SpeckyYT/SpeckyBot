const got = require('got');
const { buffer } = require('terminal-image');

module.exports = async (bot,url) => {
    const linkregex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)\.(png|jpg|jpeg|gif)/g
    let matches = String(url).match(linkregex);
    url = matches[0] ? matches[0] : url;
    bot.cache.console.drawlink = url;
    const { body } = await got(url, {responseType: 'buffer'});
    (async function(){process.stdout.write((await buffer(body)) +'\n')})();
}
