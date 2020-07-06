module.exports = {
    name: "owo",
    description: "OwO!",
    usage: ``,
    category: `misc`,
    aliases: ['uwu']
}

module.exports.run = async (bot, msg) => {
    msg.channel.send("OwO");
}
