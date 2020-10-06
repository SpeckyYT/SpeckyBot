const { Collection } = require('discord.js');

module.exports = (bot) => {
    bot.setMaxListeners(100);

    bot.stats = {};
    bot.stats.commandsExecuted = 0;
    bot.stats.slots = 0;

    bot.cache = {};
    bot.cache.messages = [];
    bot.cache.lastImage = {};
    bot.cache.console = {};
    bot.cache.console.debug = false;
    bot.cache.chatbot = {};
    bot.cache.cooldown = new Collection();
    bot.cache.runningcmds = [];
    bot.cache.globalchat = new Collection();
    bot.cache.math = {};

    bot.economy = {}

    bot.globalchats = new Collection();

    bot.userphone = []

    bot.debugN = 0;

    bot.settings = {};
}
