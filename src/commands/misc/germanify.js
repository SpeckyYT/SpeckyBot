module.exports = {
    name: "germanify",
    description: "Turns your message to german!",
    usage: "<text>",
    category: "misc",
    aliases: []
}

module.exports.run = async (bot, msg) => {
    msg.channel.send(
        msg.content
        .toLowerCase()
        .replace(/\bis/g,'ist')
        .replace(/sh/g,'sch')
        .replace(/s{2,}/g,'ß')
        .replace(/f/g,'v')
        .replace(/a/g,'ä')
        .replace(/o/g,'ö')
        .replace(/u/g,'ü')
    )
}
