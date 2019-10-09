let fetch = require('node-fetch');
let cheerio = require('cheerio');

/**
 * Getting users top from gdprofiles.com
 * @async
 * @return {Object[]}
 */

async function getTop10() {
  let result = await (await fetch('https://gdprofiles.com/')).text();
  let $ = cheerio.load(result);

  return $('div.col-sm-6.top10').eq(2).find('ul li').get()
    .map((elem) => {
      let data = $(elem).find('h3');
      let img = data.find('img').attr('src');
      let [, top, nick, stars] = data.text().match(/([0-9]+)\n(.*)\n+\s([0-9]+)\s/);

      return {
        top: +top,
        nick,
        stars: +stars,
        img,
        mod: !!data.find('.mod_badge img').toString(),
        linked: !!data.find('.badge').toString(),
      };
    });
}

module.exports = getTop10;
