const got = require('got');
const { buffer } = require('terminal-image');

module.exports = async (url) => {
    const { body } = await got(url, {responseType: 'buffer'});
    (async function(){process.stdout.write(await buffer(body)+'\n')})()
}
