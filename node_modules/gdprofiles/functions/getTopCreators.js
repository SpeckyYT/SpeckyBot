let fetch = require('node-fetch');
let cheerio = require('cheerio');

/**
 * Getting creators top from gdprofiles.com
 * @async
 * @return {Object[]}
 */

async function getTopCreators() {
  let result = await (await fetch('https://gdprofiles.com/')).text();
  let $ = cheerio.load(result);

  return $('div.col-sm-6.top10').eq(3).find('li').get()
    .map((elem) => {
      let data = $(elem).find('h3');
      let img = data.find('.top_playericon').attr('src');
      let [, top, nick, cp] = data.text().match(/([0-9]+)(.*)\n+([0-9]+)/);

      return {
        top: +top,
        nick,
        cp: +cp,
        img,
        mod: !!data.find('.mod_badge img').toString(),
        linked: !!data.find('.badge').toString(),
      };
    });
}

module.exports = getTopCreators;
