let fetch = require('node-fetch');
let cheerio = require('cheerio');
let getDiff = require('./getDifficultyByImg');

/**
 * Getting daily level's data from gdprofiles.com
 * @return {Object}
 */

async function getDailyLevel() {
  let result = await (await fetch('https://gdprofiles.com/')).text();
  let $ = cheerio.load(result);
  let daily = $('div.col-sm-6.top10').eq(0);
  let level = daily.find('h3 a');
  let { diff, featured, epic } = getDiff(daily.find('.leveldifficon').attr('src'));

  return {
    daily: +daily.find('h3').text().match(/Daily Level\n#(.*)\n/i)[1],
    id: +level.eq(0).attr('href').match(/gdprofiles\.com\/.*\/([0-9]+)/)[1],
    name: level.eq(0).text(),
    creator: level.eq(1).text(),
    diff,
    featured,
    epic,
    timestamp: +new Date(daily.find('ul.list-unstyled li').eq(0).text()),
  };
}

module.exports = getDailyLevel;
