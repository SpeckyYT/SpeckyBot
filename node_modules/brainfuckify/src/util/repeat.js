module.exports = function repeat(str, times) {
  return Array(times).fill(0).map(_ => str).join('');
}