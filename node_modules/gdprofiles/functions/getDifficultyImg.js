/**
 * Getting link from difficulty, featured and epic
 * @param {number} diffNum - difficulty in number
 * @param {boolean} featured - is level featured?
 * @param {boolean} epic - is level epic?
 * @return {string}
 */

function getDifficultyImg(diffNum = 5, featured = false, epic = false) {
  return `https://gdicon.net/icons/difficulty_${diffNum === 10 ? 10 : `0${diffNum}`}${featured ? '_featured' : (epic ? '_epic' : '')}.png`;
}

module.exports = getDifficultyImg;
