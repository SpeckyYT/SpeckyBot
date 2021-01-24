module.exports = (bot) ->

    String::snowflake = ->
        require 'discord.js'
        .SnowflakeUtil.deconstruct String(@)

    String::isOwner = ->
        bot.config.owner.includes String(@)

    String::highFirst = ->
        if @.length > 0 then @.charAt(0).toUpperCase() + (if @.length > 1 then @.slice 1 else '') else @

    String::findSnowflake = -> 
        bot.users.cache.get(String(@)) or
        bot.channels.cache.get(String(@)) or
        bot.guilds.cache.get(String(@)) or
        bot.emojis.cache.get(String(@))

    String::singPlur = (number, outputNumb = true) ->
        "#{if outputNumb then number else ''} #{this}#{if number == 1 then '' else 's'}".trim()

    String::toBuffer = (offset) ->
        Buffer.from(@, offset or 'base64')

    String::randomCase = ->
        [@...].map((c) -> if Math.round(Math.random()) then c.toUpperCase() else c.toLowerCase()).join('')

    String::code = (script) ->
        scriptName = if typeof script is 'string' then script else ''
        code = String(@).replace(bot.regex.trimRight,'\n').replace(/```/g, '`\u200b``') or '\u200b'
        "```#{scriptName}\n#{code}\n```"

    String::id = (length) ->
        @.match(bot.regex.id)?[0]

