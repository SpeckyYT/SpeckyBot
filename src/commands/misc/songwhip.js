module.exports = {
    name: "songwhip",
    description: "Lets you share music regardless of the platform",
    category: "misc",
    usage: `<link>`,
    aliases: ["sw"]
}

const fetch = require('node-fetch');

module.exports.run = async (bot, msg) => {
    if (!msg.cmdContent) return bot.cmdError("I can't convert nothing...")

    const url = msg.cmdContent
    if (!isValidURL(url)) return bot.cmdError("I can't convert invalid URLs...")

    // You can find an example JSON dump of the response here: <https://pastebin.com/HbUTE5E6>
    const song = await fetch('https://songwhip.com/', {
        method: 'POST',
        body: JSON.stringify({ url: url }),
    })
    .then(res => res.json());

    // Keep the description at a decent length...
    const description = song.artists[0].description
    if (description.length > 280) {
        description.slice(0, 277)
        description.concat("...")
    }

    const user = msg.author;
    const embed = bot.embed()
    .setTitle(`${song.name} by ${song.artists.map(a => a.name).join(', ')}`)
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
