{ waifus } = require 'namiko.moe'

module.exports =
    name: "waifusearch",
    description: "Searches for a waifu!",
    category: 'misc',
    usage: '<waifu Name/Anime>'
    run: (bot, msg) -> 
        return bot.cmdError('Missing query') if !msg.cmdContent
        waifusGot = await waifus(msg.cmdContent)
        return bot.cmdError('No waifu found') if !waifusGot.length
        waifu = waifusGot[0]
        msg.channel.send(
            bot.embed()
            .setAuthor(waifu.name, waifu.imageMedium, waifu.imageSource)
            .setTitle(waifu.longName)
            .setDescription(
                """
                #{waifu.description.code()}
                """
            )
            .setImage(waifu.imageRaw)
            .setFooter(waifu.source)
        )
