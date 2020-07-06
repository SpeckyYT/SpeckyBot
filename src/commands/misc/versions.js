module.exports = {
    name: "versions",
    description: "Gives you the versions of the used software of the bot!",
    usage: '',
    category: 'misc',
    aliases: ['v']
}

module.exports.run = async (bot, msg) => {
    msg.channel.send("```json\n"+JSON.stringify(process.versions,null,4)+"\n```");
}
