const coffeefuck = require('coffeefuck');

module.exports = (bot) => {
    bot.bf = coffeefuck;
    bot.brainfuck = bot.bf;
}
