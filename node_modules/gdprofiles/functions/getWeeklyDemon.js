let fetch = require('node-fetch');
let cheerio = require('cheerio');
let getDiff = require('./getDifficultyByImg');

/**
 * Getting weekly demon's info from gdprofiles.com
 * @async
 * @return {Object}
 */

async function getWeeklyDemon() {
  let result = await (await fetch('https://gdprofiles.com/')).text();
  let $ = cheerio.load(result);
  let weekly = $('div.col-sm-6.top10').eq(1);
  let level = weekly.find('h3 a');
  let { diff, featured, epic } = getDiff(weekly.find('.leveldifficon').attr('src'));

  return {
    weekly: +weekly.find('h3').text().match(/Weekly demon\n#(.*)\n/)[1],
    id: +level.eq(0).attr('href').match(/gdprofiles\.com\/.*\/([0-9]+)/)[1],
    name: level.eq(0).text(),
    creator: level.eq(1).text(),
    diff,
    featured,
    epic,
    timestamp: +new Date(weekly.find('ul.list-unstyled li').eq(0).text()),
  };
}

module.exports = getWeeklyDemon;
