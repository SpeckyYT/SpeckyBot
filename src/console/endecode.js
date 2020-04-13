module.exports = {
    name: 'encode',
    aliases: ['decode','encrypt','decrypt']
}

module.exports.run = async (bot, data) => {
    console.log(bot.encrypt(data.content).red);
}
