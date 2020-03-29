module.exports = {
    name: 'clear',
    aliases: ['clean','cc','delete']
}

module.exports.run = async (bot, data) => {
    console.clear();
}
