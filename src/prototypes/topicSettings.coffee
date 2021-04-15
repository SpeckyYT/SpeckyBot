{ Channel } = require('discord.js');

module.exports = ->
    Channel.prototype.topicSetting = (string='') ->
        if @.topic then @.topic.topicSetting string else false

    String.prototype.topicSetting = (string='') ->
        String(@).toLowerCase().includes("[#{string.toLowerCase()}]")
