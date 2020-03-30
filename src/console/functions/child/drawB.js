const got = require('got');
const { buffer } = require('terminal-image');

(async () => {
    const { body } = await got(process.argv[2], {responseType: 'buffer'});
    console.log((await buffer(body)));
    process.exit(0);
})()