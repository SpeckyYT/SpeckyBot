module.exports = 
    name: "events"
    description: "Gives you all the events that got used!"
    usage: ""
    category: "misc"
    aliases: ["event"]
    run: (bot, msg) ->
        await msg.channel.send(
            bot.embed()
            .setTitle "Events!"
            .setDescription(
                bot.eventNames()
                .map((e) -> [e,bot.listeners(e).length])
                .sort((a,b) -> b[1]-a[1])
                .map((e) -> """`#{e[0]}`: #{e[1]}""")
                .join '\n'
            )
        )
