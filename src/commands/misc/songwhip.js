module.exports = {
    name: "songwhip",
    description: "Lets you share music regardless of the platform",
    category: "misc",
    usage: `<link>`,
    aliases: ["sw"]
}

const axios = require('axios')

module.exports.run = async (bot, msg) => {
    if (!msg.args) {
        return bot.cmdError("I can't convert nothing...")
    }

    const url = msg.args[0]
    if (!isValidURL(url)) {
        return bot.cmdError("I can't convert invalid URLs...")
    }

    const data = await axios.post('https://songwhip.com/', {url: url})
    // You can find an example JSON dump of the response here: <https://pastebin.com/HbUTE5E6>
    const song = JSON.parse(data)

    // Keep the description at a decent length...
    const description = song.artists[0].description
    if (description.length > 280) {
        description.slice(0, 277)
        description.concat("...")
    }

    const user = msg.author;
    const embed = bot.embed()
    .setTitle(`${song.name} by ${song.artists[0]}`)
    .setURL(song.url)
    .setDescription(description)
    .setThumbnail(song.image)
    .setAuthor('Songwhip • Listen on any platform', 'https://songwhip.com/apple-touch-icon.png')
    .setFooter(`Requested by: ${user.tag}`, user.avatarURL())

    msg.channel.send(embed)
}

function isValidURL(url) {
    try {
        new URL(url)
    } catch (e) {
        return false
    }
    return true
}