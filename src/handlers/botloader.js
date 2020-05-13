const { Collection } = require("discord.js");

//from https://gist.github.com/cferdinandi/42f985de9af4389e7ab3
const forEach = function (collection, callback, scope) {
    if (Object.prototype.toString.call(collection) === '[object Object]') {
        for (let prop in collection) {
            if (Object.prototype.hasOwnProperty.call(collection, prop)) {
                callback.call(scope, collection[prop], prop, collection);
            }
        }
    } else {
        for (let i = 0, len = collection.length; i < len; i++) {
            callback.call(scope, collection[i], i, collection);
        }
    }
}

module.exports = async (bot) => {
    bot.setMaxListeners(50);
    
    bot.stats = {};
    bot.stats.commandsExecuted = 0;
    bot.stats.slots = 0;

    bot.cache = {};
    bot.cache.messages = [];
    bot.cache.lastImage = {};
    bot.cache.console = {};
    bot.cache.chatbot = {};
    bot.cache.console.debug = false;

    bot.debugN = 0;

    bot.settings = {};

    bot.config = {};
    bot.config = require('../../config.json');

    bot.supportedFiles = /.(js|coffee|coffeescript|litcoffee)$/g;

    if(typeof bot.config.apikeys == "object"){
        forEach(bot.config.apikeys, (value, prop) => {
            bot.config[prop] = value;
        });
        bot.config.apikeys = null;
    }

    require('./loadeverything')(bot);
}
