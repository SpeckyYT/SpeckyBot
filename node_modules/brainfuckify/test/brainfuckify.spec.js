const { expect } = require('chai');
const Brainfuck = require('brainfuck-node');
const brainfuckify = require('../src/brainfuckify');

describe('brainfuckify', function() {
  const thisFile = fs.readFileSync(__filename, {
    encoding: 'utf8'
  });
  it('Should encode some simple text', function() {
    this.timeout(20000);
    const brainfuck = new Brainfuck();
    const input = "The quick brown fox jumps over the lazy dog.";
    const bf = brainfuckify(input);
    const bfOutput = brainfuck.execute(bf);
    expect(bfOutput.output).to.eq(input);
  });
});
