{ Collection } = require('discord.js');

module.exports = ->
    Collection::toObject = ->
        obj = new Object();
        @.forEach (v,p) -> obj[p] = v
        return obj;
