let fetch = require('node-fetch');
let cheerio = require('cheerio');
let { camelize } = require('i')();
let getDiff = require('./getDifficultyByImg');

/**
 * Getting level's data from gdprofiles.com
 * @param {number} id - level id
 * @param {string} creator - creator's nickname
 * @return {Object}
 */

async function getLevelInfo(id, creator) {
  let result = await (await fetch(`https://gdprofiles.com/${creator.replace(/\s/g, '-')}/${id}`)).text();
  let $ = cheerio.load(result);

  let h1 = $('.container h1').text();
  let check = /((User|Level) .* not found|404)$/i.test(h1);
  if (check) return null;

  let img = $('.leveldifficon').attr('src');
  let { diff, featured, epic } = getDiff(img);

  let data = $('.tabletitle tbody');
  let levelName = data.find('tr td').find('h1').text();
  let desc = data.find('tr td h3').text();

  let [stars, coins, downloads, likes, length] = $('.staricon tbody tr').eq(1).find('td').get()
    .map((elem) => {
      let info = $(elem).text();
      let value = !Number.isNaN(+info) ? +info : info;
      return value;
    });
  let infosObj = {};
  let infos = $('.col-sm-3 .well.well-sm ul li').get().slice(0, -1);
  infos.map((str) => {
    let info = $(str).text().trim().toLowerCase()
      .split(':');
    let res = camelize(info[0].replace(' ', '_'), false);
    infosObj[res] = +info[1];
    return info;
  });

  let song = $('.col-sm-3 .well.well-sm.player table tbody tr td').eq(1).find('a');
  let [, songId] = song.attr('href').match(/newgrounds\.com\/audio\/listen\/([0-9]+)/i);
  let soundtrack = {
    name: song.eq(0).text(),
    author: song.eq(1).text(),
    link: song.attr('href'),
    id: +songId,
  };

  return {
    level: levelName,
    desc,
    stars,
    coins,
    diff,
    featured,
    epic,
    downloads,
    likes,
    length,
    soundtrack,
    infos: infosObj,
  };
}

module.exports = getLevelInfo;
