module.exports = (bot) ->

    String::snowflake = ->
        require 'discord.js'
        .SnowflakeUtil.deconstruct String(@)

    String::isOwner = ->
        bot.config.owner.includes String(@)

    String::highFirst = ->
        if @.length > 0 then @.charAt(0).toUpperCase() + (if @.length > 1 then @.slice 1 else '') else @

    String::findSnowflake = -> 
        bot.users.get String(@) or
        bot.channels.get String(@) or
        bot.guilds.get String(@) or
        bot.emojis.get String(@)

    String::singPlur = (number, outputNumb = true) ->
        "#{if outputNumb then number else ''} #{this}#{if number == 1 then '' else 's'}".trim()

    String::toBuffer = (offset) ->
        Buffer.from(@, offset or 'base64')

    String::randomCase = ->
        [@...].map((c) -> if Math.round(Math.random()) then c.toUpperCase() else c.toLowerCase()).join('')
