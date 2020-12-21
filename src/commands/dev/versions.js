module.exports = {
    name: "versions",
    description: "Gives you the versions of the used software of the bot!",
    category: 'dev',
    aliases: ['v']
}

module.exports.run = async (bot, msg) => {
    msg.channel.send(JSON.stringify(process.versions,null,4).code('json'));
}
