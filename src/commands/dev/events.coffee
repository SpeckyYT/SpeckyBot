module.exports = 
    name: "events"
    description: "Gives you all the events that got used!"
    category: "dev"
    aliases: ["event"]
    run: (bot, msg) ->
        events = bot.eventNames()
        .map((e) -> [e,bot.listeners(e).length])
        .sort((a,b) -> b[1]-a[1])

        msg.channel.send(
            bot.embed()
            .setTitle "Events!"
            .setDescription(
                events
                .map((e) -> """`#{e[0]}`: #{e[1]}""")
                .join '\n'
            )
            .addField("Events", "#{events.length}")
            .addField("Listeners", "#{events.map((e) -> e[1]).reduce((a,b)->a+b)}")
        )
