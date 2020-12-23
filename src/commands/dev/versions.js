module.exports = {
    name: "versions",
    description: "Gives you the versions of the used software of the bot!",
    category: 'dev',
    type: 'send',
    aliases: ['v']
}

module.exports.run = async (bot, msg) => JSON.stringify(process.versions,null,2).code('json');
