/**
 * Getting difficulty, featured and epic from link
 * @param {string} img - link
 * @return {Object}
 */

function getDifficultyByImg(img) {
  let [, diffNum, diffMark] = img.match(/gdicon.net\/icons\/difficulty_([0-9]+)(?:_(.*))?\.png/);
  let diff = ['NA', 'Easy', 'Normal', 'Hard', 'Harder', 'Insane', 'Hard Demon', 'Easy Demon', 'Medium Demon', 'Insane Demon', 'Extreme Demon'][+diffNum];
  let featured = diffMark === 'featured';
  let epic = diffMark === 'epic';

  return {
    diff,
    featured,
    epic,
  };
}

module.exports = getDifficultyByImg;
