let getDailyLevel = require('./functions/getDailyLevel');
let getWeeklyDemon = require('./functions/getWeeklyDemon');
let getTop10 = require('./functions/getTop10');
let getTopCreators = require('./functions/getTopCreators');
let user = require('./functions/search');
let getLevelInfo = require('./functions/getLevelInfo');
let getDiffByImg = require('./functions/getDifficultyByImg');
let getDiffImg = require('./functions/getDifficultyImg');

async function search(params) {
  return user(params);
}

module.exports = {
  search,
  getDailyLevel,
  getWeeklyDemon,
  getTop10,
  getTopCreators,
  getLevelInfo,
  getDiffByImg,
  getDiffImg,
};
