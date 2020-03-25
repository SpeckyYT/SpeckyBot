const got = require('got');
const { buffer } = require('terminal-image');

module.exports = async (url) => {
    const { body } = await got(url, {responseType: 'buffer'});
    let drawing = []
    (await buffer(body)).split("\n").forEach((val,ind) => {
        drawing[ind] = val.pop(1);
    })
    (async function(){process.stdout.write(drawing.join("\n") +'\n')})();
}
