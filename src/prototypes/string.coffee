module.exports = (bot) ->
    String::snowflake = ->
        require 'discord.js'
        .SnowflakeUtil.deconstruct @

    String::isOwner = ->
        bot.config.owner.includes @

    String::highFirst = ->
        if @.length > 1 then @.charAt(0).toUpperCase() + @.slice 1 else @

    String::findSnowflake = -> 
        bot.users.get @ or
        bot.channels.get @ or
        bot.guilds.get @ or
        bot.emojis.get @
