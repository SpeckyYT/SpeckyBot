const repeat = require('./util/repeat');

/***
 * Eagerly compiles a bit of text to brainfuck.
 * @param {string} text
 * @returns {string}
 */
module.exports = function brainfuckify(text) {
  return [...text]
    .map(char => char.charCodeAt(0))
    .map(asciiValue => repeat('+', asciiValue))
    .join('.>\r') + '.';
};
const tap = x => {
  console.log(x);
  return x;
};
